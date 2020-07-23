import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest } from './../../actions/index';
import { connect } from 'react-redux';
class ProductListPage extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         products: []
    //     }
    // }

    //Render xong chạy 
    componentDidMount() {
        this.props.fetchAllProducts();
    }



    onDelete = (id) => {
        var { products } = this.state;
        callApi(`products/${id}`, 'DELETE', null).then(res => {
            if (res.status === 200) {
                var index = this.findIndex(products, id);
                if (index !== -1) {
                    products.splice(index, 1);
                    this.setState({
                        products: products
                    });
                }
            }
        });
    }

    findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        });
        return result;
    }

    render() {
        var { products } = this.props;
        console.log(products);
        // console.log(products);
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <Link to="/product/add" className="btn btn-info mb-10">Thêm sản phẩm</Link>

                    <ProductList>
                        {this.showProduct(products)}
                    </ProductList>
                </div>
            </div>
        );
    }
    showProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }

        return result;
    }
}
//Lấy dữ liệu từ store về và chuyển thành props
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

//Lấy dữ liệu lưu vào store
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
