import React, { useState } from 'react';
import moment from 'moment';

const PaymentList = ({ dealPaymentList }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    const initialVisibleItems = 1;
  
    return (
        dealPaymentList.length > 0 && (
            <div className="mt-3">
                <h2 className="font-semibold">Additional payments</h2>
                {dealPaymentList
                    .slice(0, showAll ? dealPaymentList.length : initialVisibleItems)
                    .map((item, index) => (
                        <div key={index} className="mt-1.5">
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-80">
                                Description :- &nbsp;
                                <span className="text-black font-semibold">{item?.description}</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                &nbsp;<span>Rs {item?.amount}</span> . One time . <span>{moment(item?.dueDate).format('LL')}</span>
                            </p>
                        </div>
                    ))}
                {dealPaymentList.length > initialVisibleItems && (
                    <button
                        className="mt-2 text-blue-500 hover:text-blue-700 text-xs"
                        onClick={toggleShowAll}
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        )
    );
};

export default PaymentList;
