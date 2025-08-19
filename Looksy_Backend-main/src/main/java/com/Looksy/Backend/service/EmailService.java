package com.Looksy.Backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.support}")
    private String supportEmail;

    @Value("${app.url}")
    private String appUrl;

    public void sendOtpEmail(String to, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject("Your Looksy Verification Code");

        // Use CID for embedded logo
        String logoCid = "logo";
        ClassPathResource logoResource = new ClassPathResource("static/Looksy.png");

        String emailContent = buildOtpEmailContent(otp, logoCid);
        helper.setText(emailContent, true);

        // Add logo as inline attachment
        if (logoResource.exists()) {
            helper.addInline(logoCid, logoResource);
        }

        mailSender.send(message);
    }

    private String buildOtpEmailContent(String otp, String logoCid) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "   <meta charset=\"UTF-8\">" +
                "   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "   <title>Looksy Verification</title>" +
                "   <style>" +
                "       @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');" +
                "       * { margin: 0; padding: 0; box-sizing: border-box; }" +
                "       body { " +
                "           font-family: 'Poppins', sans-serif; " +
                "           background-color: #f5f7fa; " +
                "           color: #333; " +
                "           line-height: 1.6; " +
                "       }" +
                "       .email-container { " +
                "           max-width: 600px; " +
                "           margin: 20px auto; " +
                "           background: white; " +
                "           border-radius: 16px; " +
                "           overflow: hidden; " +
                "           box-shadow: 0 10px 30px rgba(0,0,0,0.1); " +
                "       }" +
                "       .email-header { " +
                "           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); " +
                "           padding: 40px 30px; " +
                "           text-align: center; " +
                "           color: white; " +
                "       }" +
                "       .logo { " +
                "           max-width: 150px; " +
                "           height: auto; " +
                "           margin-bottom: 20px; " +
                "       }" +
                "       .email-title { " +
                "           font-size: 24px; " +
                "           font-weight: 600; " +
                "           margin-bottom: 10px; " +
                "       }" +
                "       .email-subtitle { " +
                "           font-size: 16px; " +
                "           opacity: 0.9; " +
                "       }" +
                "       .email-body { " +
                "           padding: 40px 30px; " +
                "       }" +
                "       .greeting { " +
                "           font-size: 18px; " +
                "           margin-bottom: 20px; " +
                "           color: #2d3748; " +
                "       }" +
                "       .message { " +
                "           margin-bottom: 30px; " +
                "           color: #4a5568; " +
                "       }" +
                "       .otp-container { " +
                "           background: #f8f9fa; " +
                "           border-radius: 12px; " +
                "           padding: 25px; " +
                "           text-align: center; " +
                "           margin: 30px 0; " +
                "           border: 1px dashed #e2e8f0; " +
                "       }" +
                "       .otp-label { " +
                "           font-size: 14px; " +
                "           color: #718096; " +
                "           margin-bottom: 10px; " +
                "       }" +
                "       .otp-code { " +
                "           font-size: 32px; " +
                "           font-weight: 700; " +
                "           letter-spacing: 5px; " +
                "           color: #2d3748; " +
                "           margin: 15px 0; " +
                "           font-family: monospace; " +
                "       }" +
                "       .expiry-note { " +
                "           font-size: 14px; " +
                "           color: #e53e3e; " +
                "           margin-top: 20px; " +
                "           font-weight: 500; " +
                "       }" +
                "       .security-note { " +
                "           background: #fff5f5; " +
                "           border-left: 4px solid #e53e3e; " +
                "           padding: 15px; " +
                "           margin: 30px 0; " +
                "           border-radius: 0 8px 8px 0; " +
                "       }" +
                "       .security-note p { " +
                "           font-size: 14px; " +
                "           color: #718096; " +
                "           margin-bottom: 5px; " +
                "       }" +
                "       .button { " +
                "           display: inline-block; " +
                "           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); " +
                "           color: white !important; " +
                "           text-decoration: none; " +
                "           padding: 12px 30px; " +
                "           border-radius: 50px; " +
                "           font-weight: 600; " +
                "           margin: 20px 0; " +
                "           text-align: center; " +
                "       }" +
                "       .footer { " +
                "           text-align: center; " +
                "           padding: 30px; " +
                "           background: #f8f9fa; " +
                "           color: #718096; " +
                "           font-size: 14px; " +
                "       }" +
                "       .footer a { " +
                "           color: #667eea; " +
                "           text-decoration: none; " +
                "       }" +
                "       @media only screen and (max-width: 600px) { " +
                "           .email-container { " +
                "               margin: 0; " +
                "               border-radius: 0; " +
                "           }" +
                "           .email-header, .email-body { " +
                "               padding: 30px 20px; " +
                "           }" +
                "           .otp-code { " +
                "               font-size: 28px; " +
                "               letter-spacing: 3px; " +
                "           }" +
                "       }" +
                "   </style>" +
                "</head>" +
                "<body>" +
                "   <div class=\"email-container\">" +
                "       <div class=\"email-header\">" +
                "           <img src=\"cid:" + logoCid + "\" class=\"logo\" alt=\"Looksy Logo\">" +
                "           <h1 class=\"email-title\">Verify Your Email</h1>" +
                "           <p class=\"email-subtitle\">Complete your registration with Looksy</p>" +
                "       </div>" +
                "       <div class=\"email-body\">" +
                "           <div class=\"greeting\">Hello there,</div>" +
                "           <div class=\"message\">" +
                "               <p>Thank you for signing up with Looksy! To complete your registration and start using our services, please verify your email address by entering the following one-time passcode:</p>" +
                "           </div>" +
                "           <div class=\"otp-container\">" +
                "               <div class=\"otp-label\">YOUR VERIFICATION CODE</div>" +
                "               <div class=\"otp-code\">" + otp + "</div>" +
                "               <div class=\"expiry-note\">Expires in 3 minutes</div>" +
                "           </div>" +
                "           <div class=\"security-note\">" +
                "               <p><strong>Security tip:</strong> Never share this code with anyone, including Looksy staff.</p>" +
                "               <p>If you didn't request this code, please secure your account immediately.</p>" +
                "           </div>" +
                "       </div>" +
                "       <div class=\"footer\">" +
                "           <p>© " + java.time.Year.now().getValue() + " Looksy. All rights reserved.</p>" +
                "           <p>Need help? <a href=\"mailto:" + supportEmail + "\">Contact our support team</a></p>" +
                "       </div>" +
                "   </div>" +
                "</body>" +
                "</html>";
    }
}