/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.stripe_s_key as string, {
  apiVersion: '2023-10-16' as any, // Use the latest API version
});

export default stripe;
