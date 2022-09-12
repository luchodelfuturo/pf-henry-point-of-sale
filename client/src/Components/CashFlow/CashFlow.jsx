import React from 'react';
import NavBarApp from "../NavbarApp/NavBarApp";
import s from "../CashFlow/cashFlow.module.css"

function CashFlow(props) {
    return (
        <div>
           <div className={s.title}>Cash Flow</div> 
           <div className={s.container}>
            

           </div>
           <NavBarApp/>
        </div>
    );
}

export default CashFlow;