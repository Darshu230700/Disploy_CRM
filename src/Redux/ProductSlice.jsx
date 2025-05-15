import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { DELETE_PRODUCT, DELETE_PRODUCT_FILE, DELETE_PRODUCT_FILES, DELETE_PRODUCT_PRICE, DELETE_PRODUCT_VARIATIONS, DELETE_PRODUCT_VARIATIONS_PRICE, DUPLICATE_PRODUCT, GET_PRODUCT, GET_PRODUCTBYID, GET_PRODUCT_FILES, GET_PRODUCT_FILESBYID, GET_PRODUCT_PRICE, GET_PRODUCT_PRICEBYID, GET_PRODUCT_VARIATIONS, GET_PRODUCT_VARIATIONSBYID, GET_PRODUCT_VARIATIONS_PRICEBYID, IMAGE_PRODUCT, IMPORT_PRODUCT, INSERT_PRODUCT, INSERT_PRODUCT_FILES, INSERT_PRODUCT_PRICE, INSERT_PRODUCT_VARIATIONS, INSERT_PRODUCT_VARIATIONS_PRICE, UPDATE_ACTIVE_PRODUCT } from "../Components/Common/API";

const initialState = {
  loading: false,
  error: null,
  token: null,
  status: "",
  message: "",
  getProduct: [],
  getProductByID: [],
  getPrice: [],
  getPriceByID: [],
  getVariations: [],
  getVariationsByID: [],
  getVariationsPriceByID: [],
  getFiles: [],
  getFilesByID: []
};

// insert Product
export const handleAddProduct = createAsyncThunk("data/handleAddProduct", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_PRODUCT, payload, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// get Product
export const getProduct = createAsyncThunk("ProductMaster/getProduct", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(GET_PRODUCT, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to fetch data');
    throw error

  }
});

export const getProductByID = createAsyncThunk("data/getProductByID", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(`${GET_PRODUCTBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to fetch data');
    throw error;
  }
});

// Delete User

export const handleProductDelete = createAsyncThunk("ProductMaster/handleProductDelete", async (id, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: id, }).toString();
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(`${DELETE_PRODUCT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});

// insert price

export const AddProductPrice = createAsyncThunk("ProductMaster/AddProductPrice", async ({ data, }) => {
  try {
    const response = await axios.post(INSERT_PRODUCT_PRICE, data,)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

// get price
export const getPrice = createAsyncThunk("ProductMaster/getPrice", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_PRICE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to fetch data');
    throw error;
  }
});

export const getPriceByID = createAsyncThunk("ProductMaster/getPriceByID", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductPriceID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_PRICEBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    toast.error("Failed to fech data")
    throw error;
  }
}
);

// delete Price
export const PriceDelete = createAsyncThunk("ProductMaster/PriceDelete", async (PriceID,) => {
  try {
    const queryParams = new URLSearchParams({ ProductPriceID: PriceID }).toString()
    const response = await axios.get(`${DELETE_PRODUCT_PRICE}?${queryParams}`)
    return response.data
  } catch (error) {
    console.log(error)
    toast.error("Failed to fech data")
    throw error;
  }
})

// insert Variations 
export const AddProductVariations = createAsyncThunk("ProductMaster/AddProductVariations", async ({ data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.post(INSERT_PRODUCT_VARIATIONS, data, { headers: { Authorization: `Bearer ${token}` }, })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

// get Variations

export const getVariations = createAsyncThunk("ProductMaster/getVariations", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_VARIATIONS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    throw error;
  }
});

export const getVariationsByID = createAsyncThunk("ProductMaster/getVariationsByID", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductVariationsID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_VARIATIONSBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    throw error;
  }
});

export const VariationsDelete = createAsyncThunk("ProductMaster/VariationsDelete", async (PriceID, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductVariationsID: PriceID }).toString()
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${DELETE_PRODUCT_VARIATIONS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

// VARIATIONS Price
export const AddVariationsPrice = createAsyncThunk("ProductMaster/AddVariationsPrice", async ({ data }) => {
  try {
    const response = await axios.post(INSERT_PRODUCT_VARIATIONS_PRICE, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const DeleteVariationsPrice = createAsyncThunk("ProductMaster/DeleteVariationsPrice", async (PriceID,) => {
  try {
    const queryParams = new URLSearchParams({ AddVariationsPriceID: PriceID }).toString()
    const response = await axios.get(`${DELETE_PRODUCT_VARIATIONS_PRICE}?${queryParams}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const getVariationsPriceByID = createAsyncThunk("ProductMaster/getVariationsPriceByID", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ AddVariationsPriceID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_VARIATIONS_PRICEBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    throw error;
  }
});

export const AddFileUpload = createAsyncThunk("ProductMaster/AddFileUpload", async (formData, thunkAPI) => {
  try {

    const response = await axios.post(INSERT_PRODUCT_FILES, formData,);
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});

export const getFiles = createAsyncThunk("ProductMaster/getFiles", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_FILES}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    throw error;
  }
});

export const ProductAttachment = createAsyncThunk("ProductMaster/ProductAttachment", async (FileID,) => {
  try {
    const queryParams = new URLSearchParams({ ProductAttachmentID: FileID }).toString()
    const response = await axios.get(`${DELETE_PRODUCT_FILES}?${queryParams}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})


export const getFilesByID = createAsyncThunk("ProductMaster/getFilesByID", async (payload, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductAttachmentID: payload, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${GET_PRODUCT_FILESBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    throw error;
  }
});

export const AddProductImage = createAsyncThunk("ProductMaster/AddProductImage", async ({ payload, data }) => {
  try {
    const queryParams = new URLSearchParams({ productId: payload, }).toString();
    const response = await axios.post(`${IMAGE_PRODUCT}?${queryParams}`, data)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});

export const RemoveImagefile = createAsyncThunk("ProductMaster/RemoveImagefile", async (FileID, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: FileID }).toString()
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.get(`${DELETE_PRODUCT_FILE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const handleProductImportFile = createAsyncThunk("ProductMaster/handleProductImportFile", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(IMPORT_PRODUCT, formData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});

export const handleActiveProduct = createAsyncThunk("ProductMaster/handleActiveProduct", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${UPDATE_ACTIVE_PRODUCT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch data");
    throw error;
  }
});

export const handleDuplicateProduct = createAsyncThunk("ProductMaster/handleDuplicateProduct", async (Id, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ ProductID: Id, }).toString();
    const token = thunkAPI.getState().root.auth.token
    const response = await axios.post(`${DUPLICATE_PRODUCT}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.status) {
      return { status: true, message: response.data.message, data: response.data.data, };
    }
  } catch (error) {
    console.log(error);
    throw error
  }
});

const ProductSlice = createSlice({
  name: "ProductMaster",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleAddProduct.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(handleAddProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      toast.success(action.payload.message);
    });

    builder.addCase(handleAddProduct.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getProduct = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });

    builder.addCase(getProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.getProduct = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(handleProductDelete.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(handleProductDelete.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload?.message || "Product deleted successfully";
    });

    builder.addCase(handleProductDelete.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete user";
    });

    builder.addCase(getProductByID.pending, (state) => {
      state.status = null;
    });

    builder.addCase(getProductByID.fulfilled, (state, action) => {
      state.status = null;
      state.getProductByID = action.payload?.data;
    });

    builder.addCase(getProductByID.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // PRODUCT PRICE 

    builder.addCase(AddProductPrice.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(AddProductPrice.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });

    builder.addCase(AddProductPrice.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(getPrice.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getPrice.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getPrice = payload.data;
      state.error = null;
    });

    builder.addCase(getPrice.rejected, (state, { payload }) => {
      state.loading = false;
      state.getPrice = null;
      state.error = payload ?? null;

    });

    builder.addCase(getPriceByID.pending, (state) => {
      state.status = null;
    });

    builder.addCase(getPriceByID.fulfilled, (state, action) => {
      state.status = null;
      state.getPriceByID = action.payload?.data;
    });

    builder.addCase(getPriceByID.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(PriceDelete.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(PriceDelete.fulfilled, (state, action) => {
      state.status = "succeded"
      state.data = action.payload
      state.message = action.payload?.message || "Price deleted successfully";

    })
    builder.addCase(PriceDelete.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete Price";
    });

    // PRODUCT Variations 
    builder.addCase(AddProductVariations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddProductVariations.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });
    builder.addCase(AddProductVariations.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(getVariations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVariations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getVariations = payload.data;
      state.error = null;
    });

    builder.addCase(getVariations.rejected, (state, { payload }) => {
      state.loading = false;
      state.getVariations = null;
      state.error = payload ?? null;
    });

    builder.addCase(getVariationsByID.pending, (state) => {
      state.status = null;
    });
    builder.addCase(getVariationsByID.fulfilled, (state, action) => {
      state.status = null;
      state.getVariationsByID = action.payload?.data;
    });
    builder.addCase(getVariationsByID.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(VariationsDelete.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(VariationsDelete.fulfilled, (state, action) => {
      state.status = "succeded"
      state.data = action.payload
      state.message = action.payload?.message || "Variations deleted successfully";

    })
    builder.addCase(VariationsDelete.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete Variations";
    });

    //insert VARIATIONS Price

    builder.addCase(AddVariationsPrice.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddVariationsPrice.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });
    builder.addCase(AddVariationsPrice.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });


    builder.addCase(DeleteVariationsPrice.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(DeleteVariationsPrice.fulfilled, (state, action) => {
      state.status = "succeded"
      state.data = action.payload
      state.message = action.payload?.message || "Variations deleted successfully";

    })
    builder.addCase(DeleteVariationsPrice.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete Variations";
    });

    builder.addCase(getVariationsPriceByID.pending, (state) => {
      state.status = null;
    });
    builder.addCase(getVariationsPriceByID.fulfilled, (state, action) => {
      state.status = null;
      state.getVariationsPriceByID = action.payload?.data;
    });
    builder.addCase(getVariationsPriceByID.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // add files

    builder.addCase(AddFileUpload.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(AddFileUpload.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });

    builder.addCase(AddFileUpload.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(getFiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getFiles = payload.data;
      state.error = null;
    });

    builder.addCase(getFiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.getFiles = null;
      state.error = payload ?? null;

    });

    builder.addCase(ProductAttachment.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(ProductAttachment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      // toast.success(action.payload.message);

    })
    builder.addCase(ProductAttachment.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });


    builder.addCase(getFilesByID.pending, (state) => {
      state.status = null;
    });
    builder.addCase(getFilesByID.fulfilled, (state, action) => {
      state.status = null;
      state.getFilesByID = action.payload?.data;
    });
    builder.addCase(getFilesByID.rejected, (state, action) => {
      state.status = "failed";
      toast.error(action.payload.message);
    });


    builder.addCase(AddProductImage.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(AddProductImage.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });

    builder.addCase(AddProductImage.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(RemoveImagefile.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(RemoveImagefile.fulfilled, (state, action) => {
      state.status = "succeded"
      state.data = action.payload
      state.message = action.payload?.message || "file deleted successfully";

    })
    builder.addCase(RemoveImagefile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete image";
    });

    builder.addCase(handleProductImportFile.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(handleProductImportFile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });

    builder.addCase(handleProductImportFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(handleActiveProduct.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(handleActiveProduct.fulfilled, (state, action) => {
      state.loading = false;
      toast.success(action.payload.message);
    })
    builder.addCase(handleActiveProduct.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message);
    })

    builder.addCase(handleDuplicateProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(handleDuplicateProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      toast.success(action.payload.message);

    });
    builder.addCase(handleDuplicateProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message);
    });

  },
});

export const { resetStatus } = ProductSlice.actions;
export default ProductSlice.reducer;
