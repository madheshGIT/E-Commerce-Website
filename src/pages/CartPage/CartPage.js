import React, { useEffect} from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromCart, toggleCartQty, getCartTotal, clearCart } from '../../store/cartSlice';
import { formatPrice } from "../../utils/helpers";
// import PaymentForm from '../PaymentPage/Payment';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emptycart } from '../../utils/images';

const CartPage = () => {
    const dispatch = useDispatch();
    const { data: cartProducts, totalItems, totalAmount, deliveryCharge } = useSelector(state => state.cart);
    // const [redirectSeconds, setRedirectSeconds] = useState(5); 

    useEffect(() => {
        dispatch(getCartTotal());
    }, [dispatch]);

    const emptyCartMsg = (
        <div>
            <img className="noitem" src={emptycart} alt="No Item Found" />
            <h4 className='text-red fw-6' id="not">NO ITEMS FOUND!!</h4>
        </div>
    );

    const discount = (Math.floor(Math.random() * (50 - 10 + 1)) + 10);


    const handleProceedToCheckout = () =>
     { 
        window.location.href = "/payments";
     };
    
    const tot=totalAmount + deliveryCharge - discount;

    return (
        <div className="cart-page">
            <ToastContainer />
            <div className="container">
                <div className="breadcrumb">
                    <ul className="breadcrumb-items flex">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <i className="fas fa-home"></i>
                                <span className="breadcrumb-separator">
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </Link>
                        </li>
                        <li>Cart</li>
                    </ul>
                </div>
            </div>
            <div className='bg-ghost-white py-5'>
                <div className='container'>
                    <div className='section-title bg-ghost-white'>
                        <h3 className="text-uppercase fw-7 ls-1">My Cart</h3>
                    </div>
                    {cartProducts.length === 0 ? emptyCartMsg : (
                        <div className="cart-content grid">
                            <div className='cart-left'>
                                <div className="cart-items grid">
                                    {cartProducts.map(cartProduct => (
                                        <div className='cart-item grid' key={cartProduct.id}>
                                            <div className='cart-item-img flex flex-column bg-white'>
                                                <img src={cartProduct.images[0]} alt={cartProduct.title} />
                                                <button type="button" className='btn-square rmv-from-cart-btn bg-ghost-white' onClick={() => dispatch(removeFromCart(cartProduct.id))}>
                                                    <span className='btn-square-icon'><i className='fas fa-trash trash-icon'></i></span>
                                                </button>
                                            </div>
                                            <div className='cart-item-info'>
                                                <h6 className='fs-16 fw-5 text-regel-blue'>{cartProduct.title}</h6>
                                                <div className="qty flex">
                                                    <span className="text-regel-blue qty-text">Qty: </span>
                                                    <div className="qty-change flex">
                                                        <button type="button" className='qty-dec fs-14' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "DEC" }))}>
                                                            <i className="fas fa-minus text-light-blue"></i>
                                                        </button>
                                                        <span className="qty-value flex flex-center">{cartProduct.quantity}</span>
                                                        <button type="button" className='qty-inc fs-14 text-light-blue' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "INC" }))}>
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-between">
                                                    <div className='fw-4 fs-15 price'>Price : {formatPrice(cartProduct.price)}</div>
                                                    <div className='sub-total fw-6 fs-18 text-regal-blue'>
                                                        <span>Sub Total: </span>
                                                        <span className=''>{formatPrice(cartProduct.totalPrice)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className='btn-danger clear' onClick={() => dispatch(clearCart())}>
                                    <span className="fs-16">Clear Cart</span>
                                </button>
                            </div>
                            <div className='cart-right bg-white'>
                                <div className='cart-summary text-light-blue'>
                                    <div className='cart-summary-title'>
                                        <h6 className='fs-20 fw-5'>Order Summary</h6>
                                    </div>
                                    <ul className='cart-summary-info'>
                                        <li className="flex flex-between">
                                            <span className='fw-4'>Selected {totalItems} items(s) Price</span>
                                            <span className='fw-7'>{formatPrice(totalAmount)}</span>
                                        </li>
                                        <li className='flex flex-between'>
                                            <span className='fw-4'>Discount</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-red'>-&nbsp;</span>
                                                {formatPrice(discount)}
                                            </span>
                                        </li>
                                        <li className='flex flex-between'>
                                            <span className='fw-4'>Delivery Cost</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-gold'>+&nbsp;</span>{formatPrice(deliveryCharge)}
                                            </span>
                                        </li>
                                    </ul>
                                    <div className='cart-summary-total flex flex-between fs-18'>
                                        <span className='fw-6'>Grand Total: </span>
                                        <span className='fw-6'>{formatPrice(tot)} </span>
                                    </div>
                                    <div className='cart-summary-btn'>
                                        <button type="button" className='btn-secondary' onClick={handleProceedToCheckout}>ProceedToCheckout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <PaymentForm total={tot}/> */}
        </div>
       
    )
}

export default CartPage;