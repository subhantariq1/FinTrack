import React from "react";
import ExpenseChart from "./ExpenseChart";
function Visualizations({data}) {

    return (
        <div>
            <p>Here you can visualize your expenses.</p>
            {/* Add your visualization components here */}
            <ExpenseChart data={data} />
            <p> will add more charts</p>
        </div>

  );
}

export default Visualizations;