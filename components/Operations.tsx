import React from "react";

const Operations = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-2">
      <div className="collapse collapse-arrow rounded-box bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Pdf Rotate</div>
        <div className="collapse-content">
          <ul className="flex flex-col gap-2 pt-2">
            <button className="btn btn-secondary shadow-sm">Something</button>
            <button className="btn btn-secondary">Something</button>
            <button className="btn btn-secondary">Something</button>
          </ul>
        </div>
      </div>
      <div className="collapse collapse-arrow rounded-box bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Pdf Rotate</div>
        <div className="collapse-content">
          <ul className="flex flex-col gap-2 pt-2">
            <button className="btn btn-secondary shadow-sm">Something</button>
            <button className="btn btn-secondary">Something</button>
            <button className="btn btn-secondary">Something</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Operations;
