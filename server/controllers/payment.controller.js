const db = require("../models");
const SSLCommerzPayment = require('sslcommerz-lts')
const Payment = db.payment;
const Appoinment = db.appoinment;
const SaleOrderLine = db.saleorderlines;
const SaleOrder = db.saleorder;
const State = db.state;

const store_id = 'qubic66e072f1d9e9d'
const store_passwd = 'qubic66e072f1d9e9d@ssl'
const is_live = false


const Appoinments = async (req) => {

    const appoinment = await Appoinment.create({
        active: true,
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        emergency_number: req.body.emergency_number,
        email: req.body.email,
        running_medecine: req.body.running_medecine,
        allergic_food: req.body.allergic_food,
        previous_surgery_or_serious_illness: req.body.previous_surgery_or_serious_illness,
        appoinment_date: req.body.appoinment_date,
        appoinment_time: req.appoinment_time,
        new_patient: req.body.new_patient,
        patient_age: req.body.patient_age,
        prev_history: req.body.prev_history,
        consultation_type: req.body.consultation_type,
        duration: req.body.duration,
        is_emergency: req.body.is_emergency,
        image_url: req.body.image_url,
        reason_for_visit: req.body.reason_for_visit,
        status: req.body.status,
        attachment: req.body.attachment,
        doctor_id: req.body.doctor_id,
        patient_id: req.body.patient_id,
        payment_id: req.body.payment_id,
        hospital_id: req.body.hospital_id
    });

    return appoinment

};

exports.CreatePayment = async (req, res) => {
    
    try {
        const userId = req.userId;
        const total = Number(req.body.total_amount);

        if (!total || total <= 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid appointment amount"
            });
        }

        // Generate unique transaction ID
        const tran_id = `AP-${Date.now()}-${userId}`;

        // 1. Create appointment first
        const appointment = await Appoinments(req)

        // 2. Create payment record
        const payment = await Payment.create({
            appointment_id: appointment.id,
            patient_id: userId,
            amount: total,
            tran_id: tran_id,
            status: "PENDING"
        });

        // 3. Save payment ID to appointment if you have payment_id
        await appointment.update({
            payment_id: payment.id
        });

        // 4. Initialize SSLCommerz
        const paymentData = {
            total_amount: total,
            currency: "BDT",
            tran_id: tran_id,
            success_url: `https://server.careconnect.com.bd/api/payment/success/${tran_id}`,
            fail_url: `https://server.careconnect.com.bd/api/payment/failed/${tran_id}`,
            cancel_url: `https://server.careconnect.com.bd/api/payment/cancel/${tran_id}`,
            ipn_url: "https://server.careconnect.com.bd/api/payment/ipn",
            shipping_method: "NO",
            product_name: "Doctor Consultation",
            product_category: "Medical Consultation",
            product_profile: "general",
            cus_name: req.body.name,
            cus_email: req.body.email,
            cus_add1: req.body.address || "Dhaka",
            cus_add2: "",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: req.body.phone,
            ship_name: req.body.name,
            ship_add1: req.body.address || "Dhaka",
            ship_add2: "",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: "1000",
            ship_country: "Bangladesh"
        };

        const sslcz = new SSLCommerzPayment(
            store_id,
            store_passwd,
            is_live
        );

        const apiResponse = await sslcz.init(paymentData);

        if (!apiResponse?.GatewayPageURL) {
            return res.status(500).send({
                success: false,
                message: "Could not initialize payment"
            });
        }

        // 5. Send payment URL to frontend
        return res.status(200).send({
            success: true,
            appointment_id: appointment.id,
            payment_id: payment.id,
            tran_id: tran_id,
            url: apiResponse.GatewayPageURL
        });

    } catch (error) {
        console.error(error);

        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};




exports.PaymentSuccess = async (req, res) => {
    try {
        const { tran_id, userId } = req.params;
        await SaleOrder.update(
            { paymentstatus: 'Done' },
            { where: { tran_id } }
        );

        await SaleOrderLine.destroy({
            where: {
                userId: userId
            }
        })

        res.redirect(`http://localhost:3000/success/${tran_id}`);
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).send({ success: false, message: error.message });
    }
};

exports.PaymentFailed = async (req, res) => {
    res.redirect('http://localhost:3000/failed')
}

exports.PaymentCancel = async (req, res) => {
    res.redirect('http://localhost:3000/cancel')
}


exports.PaymentValidate = async (req, res) => {
    const data = {
        val_id: ADGAHHGDAKJ456454 //that you go from sslcommerz response
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.validate(data).then(data => {
        //process the response that got from sslcommerz 
        // https://developer.sslcommerz.com/doc/v4/#order-validation-api
    });
}

exports.PaymentInitiateRefund = async (req, res) => {
    const data = {
        refund_amount: 10,
        refund_remarks: '',
        bank_tran_id: CB5464321445456456,
        refe_id: EASY5645415455,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.initiateRefund(data).then(data => {
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
    });
}

exports.PaymentRefundQuery = async (req, res) => {
    const data = {
        refund_ref_id: SL4561445410,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.refundQuery(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
    });
}

exports.PaymentTransactionQueryByTransactionId = async (req, res) => {
    const data = {
        tran_id: AKHLAKJS5456454,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.transactionQueryByTransactionId(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#by-session-id
    });
}

exports.PaymentTransactionQueryBySessionId = async (req, res) => {
    const data = {
        sessionkey: AKHLAKJS5456454,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.transactionQueryBySessionId(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#by-session-id
    });
}