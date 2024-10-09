import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./pages/home";
import { Provider } from "react-redux";
import store from "@src/store";
import { ErrorBoundarayContainer } from "@src/components/error-boundary";
import LoginPage from "@src/pages/login";
import LayoutPage from "@src/components/layout/layout";
import CategoryPage from "@src/pages/admin/category/category";
import ProductPage from "@src/pages/admin/product/product";
import StatisticPage from "@src/pages/admin/statistic";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FFAB08",
              fontFamily: "Nunito, sans-serif",
            },
          }}
        >
          <ErrorBoundarayContainer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/layoutPage"
                element={
                  <LayoutPage>
                    <Outlet />
                  </LayoutPage>
                }
              >
                <Route path="categoryPage" element={<CategoryPage />} />
                <Route path="productPage" element={<ProductPage />} />
                <Route path="statisticPage" element={<StatisticPage />} />
              </Route>

              {/* <Route
                path="*"
                element={<Navigate to="/layoutPage/categoryPage" />}
              /> */}
            </Routes>
          </ErrorBoundarayContainer>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
