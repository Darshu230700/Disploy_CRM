import React from "react";


const CallTabs = () => {
    return (
        <>
            <p className="font-bold text-center mt-2">
                Add a Phone number to this contact
            </p>
            <p className="text-center">
                Start phone calls from here using our Marketplace phone call
                apps or transfer calls to your phone.
            </p>
            <br />
            <div className="flex items-center justify-center">
                <div className="ml-10">
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTEwLjc4MyAxOC4wOTYzVjc1LjA5NDRIOS45MzMzOUM5LjkzMzM5IDc1LjA5NDQgOS45MzM3IDM3LjExNjkgOS45MzMzOSAxOC4wODgxQzkuOTMzMzcgMTYuOTMwMiAxMC44NzIgMTYgMTIuMDI5OCAxNkgxMDguNjg3QzEwOS44NDUgMTYgMTEwLjc4MyAxNi45Mzg1IDExMC43ODMgMTguMDk2M1oiIGZpbGw9IiMwMDM2MjEiLz4KPHBhdGggZD0iTTMgNzUuOTUyNEMzIDc1LjcyOTIgMy4xODA5IDc1LjU0ODMgMy40MDQwNSA3NS41NDgzSDExNy4zNDVDMTE3LjU2OCA3NS41NDgzIDExNy43NDkgNzUuNzI5MiAxMTcuNzQ5IDc1Ljk1MjRDMTE3Ljc0OSA3OC4xODM5IDExNS45NCA3OS45OTI5IDExMy43MDkgNzkuOTkyOUg3LjA0MDQ2QzQuODA4OTggNzkuOTkyOSAzIDc4LjE4MzkgMyA3NS45NTI0WiIgZmlsbD0iIzAwMzYyMSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTU5LjA5NzQgMTcuODkwMUg2MS42MTg3SDU5LjA5NzRaIiBmaWxsPSIjMDAzNjIxIi8+CjxwYXRoIGQ9Ik01OS4wOTc0IDE3Ljg5MDFINjEuNjE4NyIgc3Ryb2tlPSIjNzc5Mjg4IiBzdHJva2Utd2lkdGg9IjAuOTYyMDE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI3OTBfMTY5OTMpIj4KPHJlY3QgeD0iMTEuNjU0MyIgeT0iMjAuMjQzMiIgd2lkdGg9Ijk3LjI0NzYiIGhlaWdodD0iNTEuNzE4IiBmaWxsPSIjRDdGOUQzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzguNDg4NCAyOUMzNi41NjE4IDI5IDM1IDMwLjU2MTggMzUgMzIuNDg4NFY1NC41ODE0QzM1IDU2LjUwOCAzNi41NjE4IDU4LjA2OTggMzguNDg4NCA1OC4wNjk4SDUwLjQ5MDhMNjAuNTgxNiA2OC4xNjA2TDcwLjY3MjQgNTguMDY5OEg4MS41MTE2QzgzLjQzODIgNTguMDY5OCA4NSA1Ni41MDggODUgNTQuNTgxNFYzMi40ODg0Qzg1IDMwLjU2MTggODMuNDM4MiAyOSA4MS41MTE2IDI5SDM4LjQ4ODRaIiBmaWxsPSIjM0RCQzYyIi8+CjxwYXRoIGQ9Ik01Ny41NTExIDQwLjgzNzhDNTcuNTUxMSA0MC44Mzc4IDU3LjE5NSA0MS4yODIyIDU3LjAxNjggNDEuNTQ4N0w1Ni42NjAzIDQyLjA4MThDNTYuMzkzMSA0Mi40MzcyIDU2LjQ4MSA0Mi42MTQgNTYuNTY4OCA0Mi43OTA4QzU2LjkyMDcgNDMuMzIwOSA1Ny41MzY5IDQ0LjIwNDEgNTguNTA2OCA0NS4xNzQ1QzU5LjMwMDQgNDUuOTY4NCA2MC4wOTQ4IDQ2LjU4NTIgNjAuODg5NSA0Ny4xMTM0QzYxLjA2NjMgNDcuMjAxMiA2MS4yNDMgNDcuMjg5IDYxLjU5ODMgNDcuMDIxOEw2Mi45MzA0IDQ2LjEzMDNDNjMuNTUyMSA0NS42ODQ3IDY0LjM0OTQgNDUuNTkyOCA2NC45Njc0IDQ2LjAzMzFDNjQuOTY3NCA0Ni4wMzMxIDY3LjQ0MDkgNDcuNDQwMSA2OC40MTA5IDQ4LjQxMDRDNjkuODIxOCA0OS44MjE5IDY4Ljg0MjUgNTEuMDY2MiA2Ny41OTc1IDUyLjMxMTdDNjMuNzczMyA1Ni4yMjU2IDU3LjQxOTkgNTAuOTM3MiA1NC42ODYzIDQ4LjIwMjZDNTIuMjE3IDQ1LjgyMTIgNDcuOTA0NCAzOS41NDk3IDUxLjM3MjIgMzYuMTY4OEM1Mi4xNzI5IDM1LjI3OTUgNTIuNzk0NiAzNC44MzQgNTMuNDE0OSAzNC43NDI4QzU0LjEyNCAzNC41NjI2IDU0Ljc0MzIgMzQuNzM3MSA1NS4yNzE5IDM1LjM1NUM1Ni4yNDE4IDM2LjMyNTQgNTcuNjQ4NiAzOC43MTEzIDU3LjY0ODIgMzguNzk5OUM1OC4wODggMzkuNTA2NyA1Ny45OTY0IDQwLjIxNTggNTcuNTUxMSA0MC44Mzc4WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yNzkwXzE2OTkzIj4KPHJlY3Qgd2lkdGg9Ijk3LjI0NzYiIGhlaWdodD0iNTEuNzE4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuNjU0MyAyMC4yNDMyKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                        alt=""
                        className="ml-5"
                    />
                    <br />
                    Make calls from web app
                </div>
                <div className="ml-10">
                    <img
                        src="https://cdn.dub-1.pipedriveassets.com/sales-phone-client/0698e00b2074c334b5b162640f2acb3b.svg"
                        alt=""
                        className="ml-5"
                    />
                    <br />
                    Make calls from web app
                </div>
            </div>
        </>
    )
}


export default CallTabs