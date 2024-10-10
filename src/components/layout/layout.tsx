import React from "react";
import { Layout, Menu, theme } from "antd";
import { TbCategory2 } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoCellularOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const { Content, Sider } = Layout;

const items = [
  {
    key: "productPage",
    icon: <IoFastFoodOutline />,
    label: <Link to="productPage">Product</Link>,
  },
  {
    key: "categoryPage",
    icon: <TbCategory2 />,
    label: <Link to="categoryPage">Category</Link>,
  },
];

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "white", paddingInline: "10px" }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-center items-center h-[65px]">
          <img className="w-[150px]" src="/logoFooter.svg" alt="logo" />
        </div>
        <Menu
          style={{ border: "0px" }}
          //   theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout style={{ height: "100vh" }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ height: "100vh" }}>
          <div
            style={{
              //   padding: 24,
              //   minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100vh",
            }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
