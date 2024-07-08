import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/App";
import { toast } from "react-hot-toast";
import { format, parseISO } from "date-fns";

const YourOrder = () => {
  const { userAuth } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/api/order/user-orders/${userAuth.user.id}`)
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userAuth.user.id]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.orderStatus === status));
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCancelOrder = (orderId) => {
    console.log("Cancel order:", orderId);
    // Implement cancel order API call and state update here
    toast.success("Order cancelled successfully");
  };

  const handleConfirmReceipt = (orderId) => {
    // Implement confirm receipt API call and state update here
    console.log("Confirm receipt:", orderId);
    toast.success("Order receipt confirmed");
  };

  return (
    <div className="your-order-container">
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-1/4">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="orders-list grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
            </div>
            <div className="mb-4">
              <p>
                <strong>Full name:</strong> {order.shippingAddress.fullName}
              </p>
              <p>
                <strong>Phone number:</strong> {order.shippingAddress.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}
              </p>
              <p>
                <strong>Specific Address:</strong> {order.shippingAddress.specificAddress}
              </p>
              <p>
                <strong>Total Price:</strong> {order.totalPrice} VND
              </p>
              <p className="font-bold ">
                <strong>Status:</strong> {order.orderStatus}
              </p>
            </div>
            <div className="flex justify-end">
              {/* view details  */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => handleOrderClick(order)}>
                    View Details
                  </Button>
                </DialogTrigger>
                {selectedOrder && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>View the details of your order. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {selectedOrder.orderItems.map((item) => (
                        <div key={item.productId._id} className="mb-4">
                          <h4 className="font-bold">{item.productTitle}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Unit Price: {item.price} VND</p>
                          <p>
                            Created At:
                            {item.createdAt}
                          </p>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActionType("cancel");
                          setAlertOpen(true);
                        }}
                      >
                        Cancel Order
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActionType("confirm");
                          setAlertOpen(true);
                        }}
                      >
                        Confirm Receipt
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>

              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>{actionType === "cancel" ? "Are you sure you want to cancel this order?" : "Have you received this order?"}</AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (actionType === "cancel") {
                          handleCancelOrder(selectedOrder._id);
                        } else {
                          handleConfirmReceipt(selectedOrder._id);
                        }
                        setAlertOpen(false);
                        setDialogOpen(false);
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourOrder;
