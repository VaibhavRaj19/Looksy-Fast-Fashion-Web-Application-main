import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';


export default function PopCart(props) {

  const [anchorEl, setAnchorEl] = React.useState(props.anchorEl);
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(function () {
    setOpen(props.open)
    setAnchorEl(props.anchorEl)
  }, [props])

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  var cart = useSelector(state => state.cart)
  var values = Object.values(cart)
  var keys = Object.keys(cart)

  const totalPayableAmount = (a, b) => {
    var price = 0
    if (b.offerprice > 0) {
      price = b.offerprice * b.qty
    }
    else {
      price = b.price * b.qty
    }
    return a + price
  }
  const actualAmount = (a, b) => {
    return a + b.price * b.qty
  }
  var tpay = values.reduce(totalPayableAmount, 0)
  var aamt = values.reduce(actualAmount, 0)

  const showCart = () => {
    return values.map((item, index) => {
      return (
        <div key={item.id || index} style={{ padding: 5, display: 'flex', width: 330, justifyContent: 'space-evenly' }}>

          <div style={{ width: 60, height: 60 }}>
            <img src={`${item.icon}`} style={{ width: 60, height: 60 }} alt="" />
          </div>

          <div style={{ padding: 3, display: 'flex', flexDirection: 'column', marginTop: -3 }}>
            <div style={{ color: 'black', fontWeight: 600, letterSpacing: 1, fontSize: 12 }}>
              {item.productname}
            </div>
            <div style={{ color: 'black', marginTop: 3, fontWeight: 600, letterSpacing: 1, fontSize: 12 }}>
              {item.offerprice > 0 ? <> <div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', flexDirection: 'row' }}><span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>&#8377;{item.offerprice}</span><span style={{ textDecoration: 'line-Through', color: 'red', marginLeft: 10 }}>&#8377;{item.price}</span></div></div><div><span style={{ color: 'green', fontSize: 12, fontWeight: 700 }}>Save &#8377;{item.price - item.offerprice}</span></div></> : <><span>&#8377;{item.price}</span><span>Fixed Price</span></>}
            </div>
          </div>

          <div style={{ fontWeight: 600, letterSpacing: 1, fontSize: 12 }}>X {item.qty}</div>
          <span style={{ fontWeight: 600, letterSpacing: 1, fontSize: 12 }}>
            {item.offerprice > 0 ? <>&#8377;{item.offerprice * item.qty}</> : <>&#8377;{item.price * item.qty}</>}
          </span>

        </div>
      )
    })
  }

  const showPaymentDetails = () => {
    return (
      <div>
        {keys.length > 0 ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

            <div style={{ padding: '5px 0px 5px 0px', display: 'flex', width: 300, justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14 }}>Total Amount:</div>
              <span style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14 }}>&#8377;{aamt}</span>
            </div>

            <div style={{ padding: '5px 0px 5px 0px', display: 'flex', width: 300, justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14, color: 'green' }}>You Save:</div>
              <span style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14, color: 'green' }}>-&#8377;{aamt - tpay}</span>
            </div>

            <div style={{ padding: '5px 0px 5px 0px', display: 'flex', width: 300, justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14, color: 'rgb(239, 179, 11)' }}>Shipping:</div>
              <span style={{ fontWeight: 600, letterSpacing: 1, fontSize: 14, color: 'rgb(239, 179, 11)' }}>Free</span>
            </div>

            <div>
              <Divider style={{ width: 350 }} />
            </div>

            <div style={{ padding: '5px 0px 5px 0px', display: 'flex', width: 300, justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, letterSpacing: 1, fontSize: 14 }}>Amount Payable:</div>
              <span style={{ fontWeight: 700, letterSpacing: 1, fontSize: 14 }}>&#8377;{tpay}</span>
            </div>

          </div>
          : null}
      </div>
    )
  }

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {showCart()}
        <Divider />
        {showPaymentDetails()}
      </Popover>
    </div>
  );
}