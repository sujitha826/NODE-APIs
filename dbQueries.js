const conn = require("../GST Billing_App/models/db.js");
class Gstbill {
    constructor(data) {
        this.product_code = data.product_code
        this.product_name = data.product_name
        this.product_price = data.product_price
        this.product_gst = data.product_gst
    }
    addProduct(conn) {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO products (product_code, product_name, product_price, product_gst) VALUES(?, ?, ?, ?)", [this.product_code,
            this.product_name, this.product_price, this.product_gst], (err, reslt, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static search(conn, item) {
        return new Promise((resolve, reject) => {
            if (item) {
                conn.query("SELECT product_code, product_name, product_price, product_gst from products WHERE product_code = ? OR product_name = ?", [item, item], (err, reslt) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(reslt)
                })
            }
        })
    }
    static gettotalcost(conn, data) {
        return new Promise((resolve, reject) => {
            conn.query("SELECT product_price, product_gst FROM products WHERE product_code IN ("+ conn.escape(data.products_code)+")", data.code, (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static getHisory(conn, data) {
        return new Promise((resolve, reject) => {
            conn.query("SELECT Bill_Details FROM bill_history WHERE Time_stamp BETWEEN ? AND ?", [data.start, data.end], (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static addHistory(conn, data) {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO bill_history (Bill_Details) VALUES(?)", data, (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static sessionAdd(conn, data, session_id) {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO session_table (session_id, user_id) values(?, ?)", [session_id, data], (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static sessionread(conn, session_id) {
        return new Promise((resolve, reject) => {
            conn.query("SELECT l.role, s.user_id, s.session_time FROM login as l INNER JOIN session_table as s on l.username = s.user_id WHERE session_id = ?", session_id, (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    static sessionDel(conn, session_id) {
        return new Promise((resolve, reject) => {
            conn.query("DELETE FROM session_table WHERE session_id = ?", session_id, (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
    editProduct(conn) {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE  products SET product_name = ?, product_price = ?, product_gst = ? WHERE product_code = ?', [this.product_name,
            this.product_price, this.product_gst, this.product_code], (err, reslt) => {
                if (err) {
                    reject(err)
                }
                resolve(reslt)
            })
        })
    }
}
module.exports = Gstbill