// authController.js
import User from '../models/userModel.js';
import { sendEmail } from '../views/notificationTemplate.js';
import { emailConstants } from '../constants/emailConstants.js';

const generateOTP = () => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  return otp;
};

export const signup = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'Please provide username and email' });
    }

    if (!(await User.findOne({ email }))) {
      try {
        const user = await User.create({
          username,
          email,
        });

        // Generate OTP
        const otp = generateOTP();

        // Save the OTP to the user document
        user.otp = otp;
        await user.save();

        // Send email with OTP to the user
        sendEmail(user.email, `Your OTP for registration is: ${otp}`);

        res.json({ ...user._doc, otp });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating user' });
      }
    } else {
      res.status(200).json({ error: 'Email is already taken.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    return res.status(200).json({ success: true, message: 'Email found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (otp === user.otp) {
      res.json({ message: 'OTP verification successful', success: true });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
