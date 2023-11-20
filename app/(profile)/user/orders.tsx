import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import Typography2 from '@/components/atoms/typography';
import Image from 'next/image';
import './orders.scss';

export default function CollapsibleTable() {
  const [open, setOpen] = useState({});
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);
    // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem('fariToken');

const toggleRow = (orderid: any) =>
  setOpen((previous) => ({
    ...previous,
    [orderid]: !(previous[orderid] ?? false),
  }));

  async function getVendorOrders(){
 let vendorid = localStorage.getItem('vendorID');	
 try {
    const response = await fetch(`${FARI_API}/store/vendororders/${vendorid}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
    })
    const data = await response.json(); 
     setDetails(data.orders)
    return data.orders;
  } catch (error) {
    console.log(error);
  }
};

    async function getVendorOrders2(){
 let vendorid = localStorage.getItem('vendorID');	
 try {
    const response = await fetch(`${FARI_API}/store/vendororders2/${vendorid}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
    })
    const data = await response.json(); 
     setOrders(data.orders) 
    return data.orders;
  } catch (error) {
    console.log(error);
  }
};



async function markFulfilled(orderid: any){
  let id = orderid;
  try {
    const response = await fetch(`${FARI_API}/store/vendor-fullfillment/${id}`,{
      method: 'PATCH',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
    })
    const data = await response.json();
    getVendorOrders2().then(getVendorOrders);
    return data.order;
  } catch (error) {
    console.log(error);
  }

}


  
  useEffect(() => {
  getVendorOrders2().then(getVendorOrders);
  }, []); 
  
return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order #</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Total</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Fulfillment Status</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        <React.Fragment>
        {orders && orders.length > 0 ? orders.map((order) => {
         return order.vendor_status === 'Fulfillment Complete' ?  (
           
          <>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={order.orderid}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => toggleRow(order.orderid)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>        
        <TableCell component="th" scope="row">{order.orderid}</TableCell>
        <TableCell align="right">{order.username}</TableCell>
        <TableCell align="right">{order.dateformatted}</TableCell>
        <TableCell align="right">{order.order_total}</TableCell>
        <TableCell align="right">{order.order_status}</TableCell>
        <TableCell align="right"><button disabled>Fulfilled</button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open[order.orderid] ?? false} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Color/Size</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
 {details && details.length > 0 ? details.map((detail) => {
                return detail.orderid == order.orderid ? (
                  <>
                 <TableRow key={detail.orderid}>
                      <TableCell component="th" scope="row">
                        {detail.prod_name}
                      </TableCell>
                      <TableCell>{detail.product_color} / {detail.product_size}</TableCell>
                      <TableCell align="right">{detail.product_qty}</TableCell>
                      <TableCell align="right">{detail.product_price}</TableCell>
                      <TableCell align="right">${Math.round(detail.product_qty * detail.product_price * 100) / 100}</TableCell>
                    </TableRow>
                
                </>
                ) : (<></>)
                   
          }) : null}
                        
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
         
         </>
         
         ) : (
           
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={order.orderid}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => toggleRow(order.orderid)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>        
        <TableCell className="flex items-center" component="th" scope="row">
        <Image
          src={'/assets/images/new-1-svgrepo-com.svg'}
          alt=''
          className='w-6 h-6 absolute ml-[-1.5rem] mt-[-.5rem]'
        />
          {order.orderid}</TableCell>
        <TableCell align="right">{order.username}</TableCell>
        <TableCell align="right">{order.dateformatted}</TableCell>
          <TableCell align="right">{order.order_total}</TableCell>
        <TableCell align="right">{order.order_status}</TableCell>
        <TableCell align="right"><button className="text-[red]" onClick={() => markFulfilled(order.orderid)}>Mark Fulfilled</button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open[order.orderid] ?? false} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Color/Size</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
 {details && details.length > 0 ? details.map((detail) => {
                return detail.orderid == order.orderid ? (
                  <>
                 <TableRow key={detail.orderid}>
                      <TableCell component="th" scope="row">
                        {detail.prod_name}
                      </TableCell>
                      <TableCell>{detail.product_color} / {detail.product_size}</TableCell>
                      <TableCell align="right">{detail.product_qty}</TableCell>
                      <TableCell align="right">{detail.product_price}</TableCell>
                      <TableCell align="right">${Math.round(detail.product_qty * detail.product_price * 100) / 100}</TableCell>
                    </TableRow>
                
                </>
                ) : (<></>)
                   
          }) : null}
              
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
        </>
         
         ) 
       }) : <Typography2 variant='h4' className="text-gray-400"> No customer orders yet. </Typography2> }
            </React.Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

