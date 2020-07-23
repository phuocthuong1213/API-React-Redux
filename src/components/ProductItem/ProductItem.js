import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProductItem extends Component {

    onDelete = (id) => {
        // this.props.onDelete(id);
        // console.log(id);
        if (window.confirm('Bạn có muốn xóa hay không !!!')) {
            this.props.onDelete(id);
        }
    }

    render() {
        var { product } = this.props;
        var statusName = product.status ? 'Còn hàng' : 'Hết hàng';
        var statusClass = product.status ? 'warning' : 'default';
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`label label-${statusClass}`}>{statusName}</span>
                </td>
                <td>

                    <Link to={`/product/${product.id}/edit`} className="btn btn-success mr-10">Sửa</Link>
                    <button type="button" className="btn btn-danger" onClick={() => this.onDelete(product.id)}>Xóa</button>

                </td>
            </tr>
        );
    }
}

export default ProductItem;
