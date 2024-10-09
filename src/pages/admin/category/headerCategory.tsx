import { Button, Input, Typography } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Header } from "antd/es/layout/layout";
import { ICategory } from "@src/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";

interface showModal {
  showModal: () => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}

const HeaderCategory: React.FC<showModal> = ({
  showModal,
  searchValue,
  setSearchValue,
}) => {
  return (
    <>
      <Header
        style={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          marginBlock: 10,
          paddingInline: "20px",
        }}
      >
        <div className="flex gap-6 items-center mt-3  w-[100%]">
          <Typography style={{ fontSize: "26px", fontWeight: 600 }}>
            Category
          </Typography>
        </div>
        <div className="flex justify-between w-[100%]">
          <div className="flex gap-6 items-center">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "16px",
                paddingInline: "15px",
              }}
              suffix={
                <IoSearchOutline
                  style={{ fontSize: "20px", color: "#ffab08" }}
                />
              }
            />
          </div>
          <Button
            onClick={showModal}
            icon={<IoIosAdd style={{ color: "#ffab08", fontSize: "20px" }} />}
            style={{
              borderRadius: "16px",
              border: "1px solid #ffab08",
              color: "#ffab08",
              height: "40px",
              fontWeight: 600,
            }}
          >
            Add Category
          </Button>
        </div>
      </Header>
    </>
  );
};

export default HeaderCategory;
