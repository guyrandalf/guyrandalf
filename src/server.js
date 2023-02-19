import express from "express"
const router = express.Router()
import cors from "cors"
import nodemailer from "nodemailer"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/", router)
app.listen(5000, () => console.log("Server running"))

const contactEmail = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "work@guyrandalf.randisoft.tech", // generated ethereal user
      pass: "June181993", // generated ethereal password
    },
})

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('ready to send');
    }
})

router.post("/", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const mail = {
        from: name,
        to: "work@guyrandalf.randisoft.tech",
        subject: "Message from your portfolio website",
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
    }
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" })
        } else {
            res.json({ status: "Message sent" })
        }
    })
})