'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

interface FormValues {
  userId: string;
  password: string;
  passwordForUser?: string;
  role: 'user' | 'admin';
  checkWalletCount: number;
  userSystemTime: number;
  blockchainSelected: string[];
  bnbBalance: number;
  btcBalance: number;
  solBalance: number;
  ethBalance: number;
  tonBalance: number;
  trxBalance: number;
  ltcBalance: number;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setError(null); // Clear previous errors
      await axios.post('/api/register', data);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="User ID"
          {...register('userId', { required: 'User ID is required' })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        <input
          type="text"
          placeholder="Password For User"
          {...register('passwordForUser')}
        />
        <div>
          <label>
            <input
              type="radio"
              value="user"
              {...register('role', { required: 'Role is required' })}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              {...register('role', { required: 'Role is required' })}
            />
            Admin
          </label>
        </div>
        <input
          type="number"
          placeholder="Check Wallet Count"
          {...register('checkWalletCount', { required: 'Check Wallet Count is required' })}
        />
        <div>
          <label>
            <input
              type="radio"
              value={10}
              {...register('userSystemTime', { required: 'User System Time is required' })}
            />
            10
          </label>
          <label>
            <input
              type="radio"
              value={11}
              {...register('userSystemTime', { required: 'User System Time is required' })}
            />
            11
          </label>
          <label>
            <input
              type="radio"
              value={12}
              {...register('userSystemTime', { required: 'User System Time is required' })}
            />
            12
          </label>
          {/* Add more radio buttons as needed */}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="bnb"
              {...register('blockchainSelected')}
            />
            BNB
          </label>
          <label>
            <input
              type="checkbox"
              value="btc"
              {...register('blockchainSelected')}
            />
            BTC
          </label>
          <label>
            <input
              type="checkbox"
              value="ltc"
              {...register('blockchainSelected')}
            />
            LTC
          </label>
          <label>
            <input
              type="checkbox"
              value="sol"
              {...register('blockchainSelected')}
            />
            SOL
          </label>
          <label>
            <input
              type="checkbox"
              value="trx"
              {...register('blockchainSelected')}
            />
            TRX
          </label>
          <label>
            <input
              type="checkbox"
              value="ton"
              {...register('blockchainSelected')}
            />
            TON
          </label>
          <label>
            <input
              type="checkbox"
              value="eth"
              {...register('blockchainSelected')}
            />
            ETH
          </label>
        </div>
        <input
          type="number"
          placeholder="BNB Balance"
          {...register('bnbBalance', { required: 'BNB Balance is required' })}
        />
        <input
          type="number"
          placeholder="BTC Balance"
          {...register('btcBalance', { required: 'BTC Balance is required' })}
        />
        <input
          type="number"
          placeholder="SOL Balance"
          {...register('solBalance', { required: 'SOL Balance is required' })}
        />
        <input
          type="number"
          placeholder="ETH Balance"
          {...register('ethBalance', { required: 'ETH Balance is required' })}
        />
        <input
          type="number"
          placeholder="TON Balance"
          {...register('tonBalance', { required: 'TON Balance is required' })}
        />
        <input
          type="number"
          placeholder="TRX Balance"
          {...register('trxBalance', { required: 'TRX Balance is required' })}
        />
        <input
          type="number"
          placeholder="LTC Balance"
          {...register('ltcBalance', { required: 'LTC Balance is required' })}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}