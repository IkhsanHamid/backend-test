import nodemailer from "nodemailer"

export const createEmail = async (email: string) => {
  try {
    const html = `
      <h1>Hello World!</h1>
      <p>node mailer testing</p>
    `
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '[email]@gmail.com',
        pass: '[password]'
      }
    })

    const info = await transporter.sendMail({
      from: 'noreply',
      to: email,
      subject: "testing, testing",
      html: html
    })
    return {msg: 'success'}
  } catch (error) {
    return Promise.reject(error)
  }
}
