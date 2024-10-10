import { RootState } from "@src/store";
import {
  setCategory,
  setIsErrorCategory,
  setIsLoadingCategory,
} from "@src/store/slices/categorySlice";
import { ICategory } from "@srctypes";
import {
  Button,
  Form,
  GetProp,
  Table,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Content } from "antd/es/layout/layout";
import DrawerCategory from "./drawerCategory";
import HeaderCategory from "./headerCategory";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const { category, isLoadingCategory, isErrorCategory } = useSelector(
    (state: RootState) => state.dataCategory
  );
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = (item?: ICategory) => {
    if (item && item.id) {
      setEditCategoryId(item.id);
      form.setFieldsValue({
        image: item.image,
        name: item.name,
      });
    } else {
      setEditCategoryId(null);
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
    const fetchCategory = async () => {
      try {
        dispatch(setIsLoadingCategory(true));
        dispatch(setIsErrorCategory(false));

        const response = await axios.get(
          "https://78d8cc4c8ae1e436.mokky.dev/category"
        );

        dispatch(setCategory(response.data));
      } catch (error) {
        dispatch(setIsErrorCategory(true));
      } finally {
        dispatch(setIsLoadingCategory(false));
      }
    };

    fetchCategory();
  }, [dispatch]);

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: async ({ fileList }) => {
      setFileList(fileList);

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as FileType;
        const base64 = await getBase64(file);
        setPreviewUrl(base64);
      } else {
        setPreviewUrl(null);
      }
    },
    maxCount: 1,
    listType: "picture-card",
    fileList,
  };

  const handleSubmit = async (value: { name: string; image?: string }) => {
    try {
      const data = {
        ...value,
        image: previewUrl || "",
      };
      let response;
      if (editCategoryId === null) {
        response = await axios.post(
          "https://78d8cc4c8ae1e436.mokky.dev/category",
          data
        );
        dispatch(setCategory([...category, response.data]));
        message.success("Category added successfully");
      } else if (editCategoryId !== undefined) {
        response = await axios.patch(
          `https://78d8cc4c8ae1e436.mokky.dev/category/${editCategoryId}`,
          data
        );
        dispatch(
          setCategory(
            category.map((item) =>
              item.id === editCategoryId ? { ...item, ...data } : item
            )
          )
        );
        message.success("Category successfully updated!");
      } else {
        throw new Error("error");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error("An error has occurred. Try again.");
      console.log("Error details:", error.response?.data || error.message);
    }
  };

  const searchCategories = category.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`https://78d8cc4c8ae1e436.mokky.dev/category/${id}`);

      const updatedCategory = category.filter((item) => item.id !== id);

      dispatch(setCategory(updatedCategory));
      message.success("The category was successfully deleted");
    } catch (error) {
      message.success("An error in deleting the category");
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
      render: (_: string, record: ICategory) => (
        <img src={record.image} alt={record.name} style={{ width: 50 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: string, record: ICategory): JSX.Element => (
        <div className="flex gap-2">
          <Button
            onClick={() => deleteCategory(record.id)}
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
      <HeaderCategory
        showModal={showModal}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <Content style={{ marginInline: "20px", marginBlock: "20px" }}>
        {isLoadingCategory && <p>Загрузка...</p>}
        {isErrorCategory && <p>Ошибка!</p>}

        {!isLoadingCategory && !isErrorCategory && (
          <Table
            dataSource={searchCategories}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: pageSize,
              onShowSizeChange: (_, size) => setPageSize(size),
            }}
          />
        )}
      </Content>
      <DrawerCategory
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        form={form}
        handleSubmit={handleSubmit}
        editCategoryId={editCategoryId}
        previewUrl={previewUrl}
        uploadProps={uploadProps}
        fileList={fileList}
        setFileList={setFileList}
        setPreviewUrl={setPreviewUrl}
      />
    </div>
  );
};

export default CategoryPage;
