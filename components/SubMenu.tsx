"use client";
import React, { FormEvent, useEffect, useState } from "react";

type inputType = {
  name: string;
  placeholder: string;
  type: string;
  divide?: inputType[];
  select?: string[];
  default: any;
  helper?: string;
};

type menuType = {
  pdfs: (File | Blob)[];
  setPdfs: Function;
  icon: string;
  name: string;
  operation: Function;
  loading: boolean;
  setLoading: Function;
  inputs: {
    fields: inputType[];
  };
};

const SubMenu = ({
  pdfs,
  setPdfs,
  icon,
  name,
  operation,
  loading,
  setLoading,
  inputs,
}: menuType) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(() => {
    const initialState: { [key: string]: any } = {};
    for (const input of inputs.fields) {
      initialState[input.name] = input.default;
    }
    return initialState;
  });

  const initialize = () => {
    const initialState: { [key: string]: string } = {};
    for (const input of inputs.fields) {
      initialState[input.name] = input.default ? input.default : "";
    }
    setFormData(initialState);
  };

  const handleChange = (e: {
    target: {
      [x: string]: any;
      name: any;
      value: any;
    };
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await operation(pdfs, setPdfs, formData);
    setLoading(false);
    // initialize();
  }

  return (
    <div>
      <div className="collapse collapse-arrow bg-secondary rounded-btn text-primary-content">
        <input type="checkbox" />
        <div className="collapse-title text-xs lg:text-[0.875rem] capitalize text-secondary-content font-semibold flex items-center gap-3 w-full">
          <svg
            viewBox="0 0 1024 1024"
            className="h-6 w-6 fill-secondary-content"
            dangerouslySetInnerHTML={{ __html: icon }}
          ></svg>
          {name}
        </div>
        <div className="collapse-content">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1.5 w-full"
          >
            {inputs.fields.map((input: inputType, index) => {
              if (input.type === "checkbox") {
                return (
                  <div key={index}>
                    <div className="flex items-center text-xs gap-2 text-secondary-content mt-1.5">
                      <input
                        type={input.type}
                        name={input.name}
                        checked={formData[input.name]}
                        onChange={handleChange}
                        className="checkbox checkbox-base-300 border-base-300/100 h-6 w-6"
                      />
                      {input.placeholder}
                    </div>
                    {input.helper && (
                      <div className="text-xs text-secondary-content font-light">
                        {input.helper}
                      </div>
                    )}
                  </div>
                );
              } else if (input.type === "select" && input.select) {
                return (
                  <div key={index}>
                    <label className="label py-0">
                      <span className="label-text text-secondary-content capitalize">
                        {input.placeholder}
                      </span>
                    </label>
                    <select
                      className="select select-bordered select-md w-full text-base-content bg-base-100"
                      name={input.name}
                      value={formData[input.name]}
                      onChange={handleChange}
                    >
                      {input.select?.map((option, index) => {
                        return <option key={index}>{option}</option>;
                      })}
                    </select>
                    {input.helper && (
                      <div className="text-xs text-secondary-content font-light">
                        {input.helper}
                      </div>
                    )}
                  </div>
                );
              } else if (input.type == "divide" && input.divide) {
                return (
                  <div key={index}>
                    <div className="join">
                      {input.divide.map((div, index) => {
                        return (
                          <input
                            key={index}
                            name={div.name}
                            type={div.type}
                            placeholder={div.placeholder}
                            className="input input-sm input-bordered w-full text-base-content bg-base-100 join-item"
                            value={formData[input.name]}
                            onChange={handleChange}
                          />
                        );
                      })}
                    </div>
                    {input.helper && (
                      <div className="text-xs pr-1 text-secondary-content font-light">
                        {input.helper}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <input
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      className="input input-sm input-bordered w-full text-base-content bg-base-100"
                      value={formData[input.name]}
                      onChange={handleChange}
                    />
                    {input.helper && (
                      <div className="text-xs pr-1 text-secondary-content font-light">
                        {input.helper}
                      </div>
                    )}
                  </div>
                );
              }
            })}
            <div className="flex justify-end mt-1">
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                disabled={loading}
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
