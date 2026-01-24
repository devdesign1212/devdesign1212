import { AppDispatch, RootState } from '@/Redux/Store/store';
import { PARTNER_WALLET_BALANCE } from '@/Services/api';
import CryptoJS from 'crypto-js';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { showErrorNotification } from './notifications';
import { HandleCustomError } from './handleCustomError';
import { useDispatch } from 'react-redux';
import { saveApiResponse } from '@/Redux/Actions/apiActions';

export const PasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*()_+!])[A-Za-z\d@#$%^&*()_+!]{6,}$/;

export const PanRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const MobileNoRegex = /^[0-9]{10}$/;

export const PinCodeRegex = /^[0-9]{6}$/;

export const TextRegex = /^[A-Za-z]+$/;

const KEY = CryptoJS.enc.Hex.parse(
  '8f8c3c27506072e67715d46601e150dd6b100ac4d35615c59dc73946f563e876',
);

const IV = CryptoJS.enc.Hex.parse('0b836c31495dc2d9d3fd5abab3fe4120');

export const encryptData = (data: object | string): string => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })?.toString();

  // console.log('🔒 Encrypted Output:', encrypted);
  return encrypted;
};

export const decryptData = (ciphertext: string): any => {
  // console.log(
  //   '🔍 Starting decryption with ciphertext:',
  //   ciphertext?.substring(0, 50) + '...',
  // );

  if (!ciphertext) {
    // console.error('❌ No ciphertext provided');
    return null;
  }

  try {
    // Check if the ciphertext is a valid base64 string
    if (!/^[A-Za-z0-9+/=]*$/.test(ciphertext)) {
      // console.error('❌ Invalid ciphertext format - not a valid base64 string');
      return null;
    }

    // console.log('🔑 Using KEY:', KEY ? 'Key exists' : 'Key is missing');
    // console.log('🔐 Using IV:', IV ? 'IV exists' : 'IV is missing');

    try {
      const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // console.log('🔓 Decrypted bytes:', decryptedBytes);

      // Try different encodings if UTF-8 fails
      let decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedString) {
        // console.warn('⚠️ UTF-8 decryption returned empty, trying Latin1...');
        decryptedString = decryptedBytes.toString(CryptoJS.enc.Latin1);
      }

      if (!decryptedString) {
        throw new Error('Failed to decrypt data with both UTF-8 and Latin1');
      }

      // console.log(
      //   '✅ Successfully decrypted string:',
      //   decryptedString.substring(0, 100) + '...',
      // );

      try {
        const parsed = JSON.parse(decryptedString);
        return parsed;
      } catch (parseError) {
        // console.error(
        //   '❌ Failed to parse decrypted string as JSON:',
        //   parseError,
        // );
        // console.log('Decrypted string content:', decryptedString);
        return null;
      }
    } catch (decryptError) {
      // console.error('❌ Decryption failed:', decryptError);
      return null;
    }
  } catch (error) {
    // console.error('❌ Unexpected error during decryption:', error);
    return null;
  }
};

export const useIpAddress = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      dispatch(saveApiResponse('ipAddress', data.ip));
    } catch (error: any) {
      showErrorNotification(error, currentTheme);
    }
  };

  return { fetchIpAddress };
};

export const fetchPartnerBalanceApi = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  const apiResponses = useSelector(
    (state: RootState) => state.apiResponse.responses,
  );
  const loginData = apiResponses?.loginData
    ? decryptData(apiResponses?.loginData)
    : null;

  const loginDataRef = useRef(false);

  const fetchPartnerBalance = async () => {
    if (loginDataRef.current) return;
    loginDataRef.current = true;

    try {
      const response = await PARTNER_WALLET_BALANCE({
        partnerId: loginData?.partner_Id,
      });

      if (response?.status === 200) {
        dispatch(
          saveApiResponse(
            'PartnerBalance',
            response?.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          ),
        );
      } else {
        showErrorNotification(response?.data?.message, currentTheme);
      }
    } catch (error) {
      await HandleCustomError(error, currentTheme);
    } finally {
      loginDataRef.current = false;
    }
  };

  return { fetchPartnerBalance };
};

export const routeAccessMap: { [key: string]: number } = {
  '/card-issuance': 0,
  '/operations': 1,
  '/prefunding': 2,
  '/user-roles': 3,
  '/order-card': 4,
  '/reports': 5,
  '/help-center': 6,
};

export const isSameOrBefore = (input: Date | null, compareTo: Date | null) => {
  if (!input || !compareTo) return true;
  return (
    input.getFullYear() < compareTo.getFullYear() ||
    (input.getFullYear() === compareTo.getFullYear() &&
      (input.getMonth() < compareTo.getMonth() ||
        (input.getMonth() === compareTo.getMonth() &&
          input.getDate() <= compareTo.getDate())))
  );
};

export const isSameOrAfter = (input: Date | null, compareTo: Date | null) => {
  if (!input || !compareTo) return true;
  return (
    input.getFullYear() > compareTo.getFullYear() ||
    (input.getFullYear() === compareTo.getFullYear() &&
      (input.getMonth() > compareTo.getMonth() ||
        (input.getMonth() === compareTo.getMonth() &&
          input.getDate() >= compareTo.getDate())))
  );
};

export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
};
