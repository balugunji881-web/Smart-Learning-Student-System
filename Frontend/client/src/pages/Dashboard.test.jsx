import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AuthContext } from '../context/AuthContext';
import Dashboard from './Dashboard';

const renderDashboard = (role = 'student') => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { name: 'Test User', role }, logout: () => {} }}>
        <Dashboard />
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Dashboard role-aware content', () => {
  it('shows the student-specific heading for a student account', () => {
    renderDashboard('student');
    expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  });

  it('shows the trainer-specific heading for a trainer account', () => {
    renderDashboard('trainer');
    expect(screen.getByText(/Trainer Dashboard/i)).toBeInTheDocument();
  });

  it('shows the admin-specific heading for an admin account', () => {
    renderDashboard('admin');
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });
});
