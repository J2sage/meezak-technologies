import { API_BASE_URL } from '../env.js';

const apiBaseUrl = API_BASE_URL.replace(/\/$/, '');

async function adminRequest(path, options = {}) {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Please log in as an admin first.');

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || 'Admin request failed');
  return data;
}

export function getAdminOrders({ q = '', status = '' } = {}) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (status) params.set('status', status);
  const query = params.toString() ? `?${params}` : '';
  return adminRequest(`/orders${query}`);
}

export function getAdminOrderStats() {
  return adminRequest('/orders/stats');
}

export function updateOrderStatus(orderId, status) {
  return adminRequest(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export function getCustomersFromApi({ q = '', active } = {}) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (active !== undefined && active !== 'all') params.set('active', active);
  const query = params.toString() ? `?${params}` : '';
  return adminRequest(`/customers${query}`);
}

export function updateCustomerActive(customerId, active) {
  return adminRequest(`/customers/${customerId}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ active })
  });
}
