//generator es6
import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../action";
import * as api from "../../api";

function* fetchCustomerSaga(action) {
  const customer = yield call(api.fetchCustomer);
  yield put(actions.getCustomer.getCustomerSuccess(customer.data));
}

function* fetchProductsSaga(action) {
  try {
    const products = yield call(api.fetchProducts);
    yield put(actions.getProducts.getProductsSuccess(products.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getProducts.getProductsFailure(error));
  }
}
function* fetchProductDetailSaga(action) {
  try {
    const product = yield call(api.fetchProductDetail, action.payload.id);
    yield put(actions.getProductDetail.getProductDetailSuccess(product.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getProductDetail.getProductDetailFailure(error));
  }
}
function* createProductSaga(action) {
  try {
    const product = yield call(api.createProduct, action.payload);
    yield put(actions.createProduct.createProductSuccess(product.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createProduct.createProductFailure(error));
  }
}
function* updateProductSaga(action) {
  try {
    console.log(action);
    const product = yield call(
      api.updateProduct,
      action.payload
    );
    // yield put(actions.updateProduct.updateProductSuccess(product.data));
  } catch (error) {
    console.error(error);
    yield put(actions.updateProduct.updateProductFailure(error));
  }
}
function* deleteProductSaga(action) {
  try {
    yield call(api.deleteProduct, action.payload);
  } catch (error) {
    console.error(error);
    yield put(actions.delProduct.delProductFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.getCustomer.getCustomerRequest, fetchCustomerSaga);
  yield takeLatest(
    actions.getProductDetail.getProductDetailRequest,
    fetchProductDetailSaga
  );
  yield takeLatest(actions.getProducts.getProductsRequest, fetchProductsSaga);
  yield takeLatest(
    actions.createProduct.createProductRequest,
    createProductSaga
  );
  yield takeLatest(
    actions.updateProduct.updateProductRequest,
    updateProductSaga
  );
  yield takeLatest(actions.delProduct.delProductRequest, deleteProductSaga);
}
export default mySaga;
