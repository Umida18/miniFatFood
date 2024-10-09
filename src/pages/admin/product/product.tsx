import { RootState } from "@src/store";
import { Product } from "@src/types";
import { Button, Form, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Content } from "antd/es/layout/layout";

import {
  setIsErrorProduct,
  setIsLoadingProduct,
  setProduct,
} from "@src/store/slices/productSlice";
import HeaderProduct from "./headerProduct";
import DrawerProduct from "./drawerProduct";
import {
  setCategory,
  setIsErrorCategory,
  setIsLoadingCategory,
} from "@src/store/slices/categorySlice";

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const { product, isLoadingProduct, isErrorProducts } = useSelector(
    (state: RootState) => state.data
  );
  const { category, isLoadingCategory, isErrorCategory } = useSelector(
    (state: RootState) => state.dataCategory
  );
  const [pageSize, setPageSize] = useState(3);
  const [searchValue, setSearchValue] = useState<string>("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = (item?: Product) => {
    if (item && item.id) {
      setEditProductId(item.id);
      form.setFieldsValue({
        image: item.image,
        title: item.title,
        price: item.price,
        weight: item.weight,
        desc: item.desc,
        compound: item.compound,
        calories: item.calories,
        categoryId: item.categoryId,
      });
    } else {
      setEditProductId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(setIsLoadingProduct(true));
        dispatch(setIsLoadingCategory(true));
        dispatch(setIsErrorProduct(false));
        dispatch(setIsErrorCategory(false));

        const response = await axios.get(
          "https://78d8cc4c8ae1e436.mokky.dev/product"
        );
        const responseCategory = await axios.get(
          "https://78d8cc4c8ae1e436.mokky.dev/category"
        );

        dispatch(setProduct(response.data));
        dispatch(setCategory(responseCategory.data));
      } catch (error) {
        dispatch(setIsErrorProduct(true));
        dispatch(setIsErrorCategory(true));
      } finally {
        dispatch(setIsLoadingProduct(false));
        dispatch(setIsLoadingCategory(false));
      }
    };

    fetchProduct();
  }, [dispatch]);

  const handleSubmit = async (value: {
    image: string;
    title: string;
    price: number;
    weight: number;
    desc: string;
    compound: string[];
    calories: number;
    categoryId: number;
  }) => {
    try {
      let response;
      if (editProductId === null) {
        response = await axios.post(
          "https://78d8cc4c8ae1e436.mokky.dev/product",
          value
        );
        dispatch(setProduct([...product, response.data]));
        message.success("Product added successfully");
      } else if (editProductId !== undefined) {
        response = await axios.patch(
          `https://78d8cc4c8ae1e436.mokky.dev/product/${editProductId}`,
          value
        );
        dispatch(
          setProduct(
            product.map((item) =>
              item.id === editProductId ? { ...item, ...value } : item
            )
          )
        );
        message.success("Product successfully updated!");
      } else {
        throw new Error("error");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error("An error has occurred. Try again.");
      console.log("Error details:", error.response?.data || error.message);
    }
  };
  const searchProduct = product.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://78d8cc4c8ae1e436.mokky.dev/product/${id}`);

      const updatedProduct = product.filter((item) => item.id !== id);

      dispatch(setProduct(updatedProduct));
      message.success("The product was successfully deleted");
    } catch (error) {
      message.error("An error in deleting the product");
      console.log("error delete:", error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string, record: Product) => (
        <img
          src={`/public/${record.image}`}
          alt={record.title}
          style={{
            display: "flex",
            minWidth: "60px",
            minHeight: "60px",
            borderRadius: "6px",
            maxHeight: "50px",
            maxWidth: "50px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Compound",
      dataIndex: "compound",
      key: "compound",
      render: (compound: string[] | string) => (
        <div className="w-[150px]">
          {Array.isArray(compound) ? (
            compound.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>{compound}</p>
          )}
        </div>
      ),
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: number) => {
        if (isLoadingCategory) return "Loading...";
        const categoryName = category.find(
          (item) => item.id === categoryId
        )?.name;
        return categoryName || "Undefined Name";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Product): JSX.Element => (
        <div className="flex gap-2">
          <Button
            onClick={() => deleteProduct(record.id)}
            icon={<RiDeleteBin6Line style={{ fontSize: "16px" }} />}
          />
          <Button
            onClick={() => showModal(record)}
            icon={<MdOutlineModeEdit style={{ fontSize: "16px" }} />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#f5f5f5] h-[100vh] flex flex-col gap-10">
      <HeaderProduct
        showModal={showModal}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <Content style={{ marginInline: "20px", marginBlock: "20px" }}>
        {isLoadingProduct || (isErrorCategory && <p>Загрузка...</p>)}
        {isErrorProducts || (isErrorCategory && <p>Ошибка!</p>)}

        {!isLoadingProduct &&
          !isErrorProducts &&
          !isErrorCategory &&
          !isLoadingCategory && (
            <Table
              dataSource={searchProduct}
              columns={columns}
              rowKey="id"
              pagination={{
                pageSize: pageSize,
                onShowSizeChange: (current, size) => setPageSize(size),
              }}
            />
          )}
      </Content>
      <DrawerProduct
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        form={form}
        handleSubmit={handleSubmit}
        editProductId={editProductId}
      />
    </div>
  );
};

export default ProductPage;
