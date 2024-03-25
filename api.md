## POST สร้าง QR Code

```
สร้างรายการให้ลูกค้าสแกรนสั่งอาหาร
และปรับ status Table Desk เป็น notReady
```

```
POST /customer-booking

PAYLOAD
{
    "countAdult": //Number
    "countChildreng": //Number
    "countChild": //Number
    "packageId" : //String
    "deskNo" : //String
}

```

## POST สร้าง Billing

```
สร้างรายการ Billing
```

```
POST /billing

PAYLOAD
{
    "customerBookingId" : "",
    "deskNo" : "",
    "countPerson" : ,
    "packagePrice" : ,
    "totalPrice" :
}

```

## GET เรียกข้อมูล Package

```
แสดงรายการข้อมูล Package
```

```
GET /buffet

RESPONSE (RES)
[
    {
    "packageName"
    "packagePrice"
    },
    {
    "packageName"
    "packagePrice"
    }
]


```

## GET เรียกข้อมูล Desk

```
แสดงรายการข้อมูล Desk
```

```
GET /desk

RESPONSE (RES)
[
    {
    "deskStatus"
    "deskNo"
    },
    {
    "deskStatus"
    "deskNo"
]


```

## GET เรียกข้อมูล CustomerBooking ตาม ID

```
แสดงรายการข้อมูล CustomerBooking ตาม ID ที่ส่งมา
```

```
GET /customer-booking/:id

RESPONSE (RES)
{
    "_id": "",
    "customerName": "",
    "qrLink": "",
    "deskNo": "",
    "countPerson": 0
    "packageId": "",
    "status": "",
}


```

## GET เรียกข้อมูล Memu สำหรับหน้าเลือกเมนูอาหารของลูกค้า

```
แสดงรายการข้อมูล menu โดยรับ customerBookingId โดยต้องเอา  customerBookingId ไปหาข้อมูล package แล้วได้packageId เอา packageId ไปหา ในtable menu
```

```
GET /menu/:customerBookingId

RESPONSE (RES)
{
    "menuName":
    "menuPrice":
    "menuStatus":
    "menuType" :
    "file" :
    "packageBufferId":
}

```

## POST สร้าง OrderMenu

```
สร้างรายการอาหารที่ลูกค้าสั่ง
```

```
POST /order-menu

PAYLOAD
[
    {
        "menuId" : "",
        "price" : ,
        "quantity" : ,
        "deskNo" : "",
        "customerBookingId" : ""
    },
     {
        "menuId" : "",
        "price" : ,
        "quantity" : ,
        "deskNo" : "",
        "customerBookingId" : ""
    }
]

```

## GET เรียกข้อมูล OrderMenu

```
แสดงรายการข้อมูล menu สำหรับ Chef โดนแสดงค่าเฉพาะที่มี Status ไม่เสริฟ
```

```
GET /order-menu

RESPONSE (RES)
[
    {
        "_id": //String
        "menuId": //String
        "deskNo": //String
        "menuName": //String
        "customerBookingId": //String
        "status": //String
        "quantity": //Number
    }
]

```

## GET เรียกข้อมูล OrderMenu

```
แสดงรายการข้อมูล menu สำหรับ ลูกค้า โดนแสดงค่าที่มี Status ทั้งหมด
```

```
GET /order-menu/:customer-bookingid

RESPONSE (RES)
[
    {
        "_id": //String
        "menuName" : //String
        "quantity": //Number
        "deskNo": //String
        "customerBookingId": //String
    },
    {
        "_id": //String
        "menuName" : //St
        "quantity": //Number
        "deskNo": //String
        "customerBookingId": //String
    }
]

```

## PUT แก้ไข Status OrederMenu

```
ปรับ Status OrderMenu
```

```
PUT /order-menu/:id

PAYLOAD
{
    "status" : "served"
}
```

## GET เรียกข้อมูล Billing ทั้งหมดที่ยังไม่ชำระเงิน

```
แสดงรายการข้อมูล Billing สำหรับ Amdin โดยมี isPaid เป็น False
```

```
GET /billing

RESPONSE (RES)
[
    {
        "deskNo":
        "countPerson": //Number
        "packagePrice" //Number
        "totalPrice": //String
    }
    {
        "deskNo":
        "countPerson": //Number
        "packagePrice" //Number
        "totalPrice": //String
    }
]
```

## GET เรียกข้อมูล Billing

```
แสดงรายการข้อมูล Billing สำหรับ ลูกค้า
```

```
GET /billing/:customerBookingId

RESPONSE (RES)
{
    "deskNo":
    "countPerson": //Number
    "packagePrice" //Number
    "totalPrice": //String
}
```

## PUT billing ชำระเงินแล้ว

```
ปรับ Status isPaid เป็น true และ paidAt เวลาที่ชำระเงินปัญบัน
ปรับ Status ของ Table Desk ให้เป็น Ready
ปรับ Status ของ Table CustomerBooking ให้เป็น completed
```

```
PUT /billing/:customerBookingId

PAYLOAD
{
    "customerBookingId": //String
    "deskNo": //String
    "countPerson": //Number
    "packagePrice": //Number
    "totalPrice": //Number
    "chanelPayment": //String
    "payment": //Number
    "change": //Number
    "paidAt": //Date
    "isPaid" : //true
}
```

## get admin เรียกข้อมูล

```
แสดงรายการข้อมูล Admin สำหรับ

```

```
PUT /admin

RESPONSE (RES)
[
    {
        "fullName": //String
        "role": //String
        "username" //String
        "password": //String
    },
    {
        "fullName": //String
        "role": //String
        "username" //String
        "password": //String
    }
]
```

## get admin เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ Admin

```

```
PUT /admin

RESPONSE (RES)
[
    {
        "fullName": //String
        "role": //String
        "username" //String
        "password": //String
    },
    {
        "fullName": //String
        "role": //String
        "username" //String
        "password": //String
    }
]
```

## get billing เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ billing

```

```
GET /billing-control

RESPONSE (RES)
[
    {
        "customerBookingId": //String
        "deskNo": //Number
        "countPerson" //Number
        "packagePrice": //Number
        "totalPrice" //Number
        "chanelPayment" //String
        "paidAt" //Date
        "isPaid" //Boolean
    },
    {
        "customerBookingId": //String
        "deskNo": //Number
        "countPerson" //Number
        "packagePrice": //Number
        "totalPrice" //Number
        "chanelPayment" //String
        "paidAt" //Date
        "isPaid" //Boolean
    }
]
```

## delect billing ลบข้อมูล

```
ลบข้อมูลตาม _ID ของ billing
```

```
delect /billing-control/:id

PAYLOAD
{
    "_id": //String
},
```

## get CustomerBooking เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ CustomerBooking
```

```
GET /customer-booking-control

RESPONSE (RES)
[
    {
        "customerName": //String
        "qrLink": //String
        "deskNo" //String
        "countPerson": //Number
        "packageId" //String
        "status" //String
    },
    {
        "customerName": //String
        "qrLink": //String
        "deskNo" //String
        "countPerson": //Number
        "packageId" //String
        "status" //String
    }
]
```

## PUT แก้ไข ข้อมูล CustomerBooking

```
ี๊Update ข้อมูลใน CustomerBooking
```

```
PUT /customer-booking-control/:id

PAYLOAD
{
    "customerName": //String
    "qrLink": //String
    "deskNo" //String
    "countPerson": //Number
    "packageId" //String
    "status" //String
}
```

## delect CustomerBooking ลบข้อมูล

```
ลบข้อมูลตาม _ID ของ CustomerBooking
```

```
delect /customer-booking-control/:id

PAYLOAD
{
    "_id": //String
},
```

## get CustomerOrderMenu เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ CustomerOrderMenu
```

```
GET /order-menu-control

RESPONSE (RES)
[
    {
        "menuName": //String
        "price": //Number
        "quantity" //Number
        "deskNo": //String
        "customerBookingId" //String
        "status" //String
    },
    {
        "menuName": //String
        "price": //Number
        "quantity" //Number
        "deskNo": //String
        "customerBookingId" //String
        "status" //String
    }
]
```

## delect CustomerOrderMenu ลบข้อมูล

```
ลบข้อมูลตาม _ID ของ CustomerOrderMenu
```

```
delect /order-menu-control/:id

PAYLOAD
{
    "_id": //String
},
```

## get Menu เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ Menu
```

```
GET /menu-control

RESPONSE (RES)
[
    {
        "menuName": //String
        "menuPrice": //Number
        "menuStatus" //String
        "menuType": //String
        "file" //String
        "packageBufferId" //String
    },
    {
        "menuName": //String
        "menuPrice": //Number
        "menuStatus" //String
        "menuType": //String
        "file" //String
        "packageBufferId" //String
    }
]
```

## POST สร้าง Menu

```
สร้างข้อมูลเมนูอาหาร
```

```
POST /menu-control

PAYLOAD
[
    {
        "menuName" : //String
        "menuPrice" : //Number
        "menuStatus" : //String
        "menuType" : //String
        "file" : //String
        "packageBufferId": //String
    },
     {
        "menuName" : //String
        "menuPrice" : //Number
        "menuStatus" : //String
        "menuType" : //String
        "file" : //String
        "packageBufferId": //String
    }
]

```

## PUT แก้ไข ข้อมูล Menu

```
ี๊Update ข้อมูลใน Menu
```

```
PUT /menu-control/:id

PAYLOAD
{
    "menuName" : //String
    "menuPrice" : //Number
    "menuStatus" : //String
    "menuType" : //String
    "file" : //String
    "packageBufferId": //String
}
```

## delect Menu ลบข้อมูล

```
ลบข้อมูลตาม _ID ของ Menu
```

```
delect /menu-control/:id

PAYLOAD
{
    "_id": //String
},
```

## POST สร้าง channelPayment

```
สร้างข้อมูลวิธีการชำระเงิน
```

```
POST /channel-payment

PAYLOAD

{
    "paymentName" : //String
    "paymentStatus" : // active | unActive Default = active
},


```

## get channelPayment เรียกข้อมูล

```
แสดงรายการข้อมูลทั้งหมดของ channelPayment
```

```
GET /channel-payment

RESPONSE (RES)
[
    {
    "paymentName" : //String
    "paymentStatus" : // active | unActive Default = active
    },
    {
    "paymentName" : //String
    "paymentStatus" : // active | unActive Default = active
    },
]
```

## PUT แก้ไข ข้อมูล channel-payment

```
ี๊Update ข้อมูลใน channel-payment
```

```
PUT /channel-payment/:id

PAYLOAD
{
    "paymentName" : //String
    "paymentStatus" : // active | unActive Default = active
}
```

## delect channelPayment ลบข้อมูล

```
ลบข้อมูลตาม _ID ของ channelPayment
```

```
delect /channel-payment/:id

PAYLOAD
{
    "_id": //String
},
```

## get billing เรียกข้อมูล

```
แสดงข้อมูลที่จะนำไปทำเป็น dashboard โดยมีเงื่อนไขว่า isPaid ต้องเป็น True
```

```
GET /billing-dashboard

RESPONSE (RES)
[
    {
        "totalPrice": //String
        "qrLink": //String
        "deskNo" //String
        "countPerson": //Number
        "packageId" //String
        "status" //String
    },
]
```
