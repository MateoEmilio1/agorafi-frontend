"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { servicesSeed, type Service } from "@/constants/serviceSeed";
import { demoAccounts } from "@/constants/demoAccounts";

export type OrderStatus =
  | "CREATED"
  | "DOWNPAYED"
  | "READY_TO_RELEASE"
  | "RELEASED"
  | "REFUNDED";
export type UserRole = "CLIENT" | "PROVIDER";

export interface Order {
  id: string;
  serviceId: string;
  clientAddress: string;
  clientAlias: string;
  providerAddress: string;
  providerAlias: string;
  status: OrderStatus;
  downPaymentAmount?: number; // En realidad sería cifrado
  remainingAmount?: number; // En realidad sería cifrado
  totalAmount?: number; // En realidad sería cifrado
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  services: Service[];
  orders: Order[];
  currentRole: UserRole;
  currentUser: {
    address: string;
    alias: string;
  };
}

type AppAction =
  | { type: "TOGGLE_ROLE" }
  | { type: "CREATE_ORDER"; payload: { serviceId: string } }
  | {
      type: "UPDATE_ORDER_STATUS";
      payload: {
        orderId: string;
        status: OrderStatus;
        amounts?: { downPayment?: number; remaining?: number; total?: number };
      };
    };

const initialState: AppState = {
  services: servicesSeed,
  orders: [],
  currentRole: "CLIENT",
  currentUser: demoAccounts.client,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_ROLE":
      const newRole = state.currentRole === "CLIENT" ? "PROVIDER" : "CLIENT";
      const newUser =
        newRole === "CLIENT" ? demoAccounts.client : demoAccounts.providers[0]; // Por simplicidad, siempre el primer proveedor

      return {
        ...state,
        currentRole: newRole,
        currentUser: newUser,
      };

    case "CREATE_ORDER":
      const service = state.services.find(
        (s) => s.id === action.payload.serviceId
      );
      if (!service) return state;

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        serviceId: action.payload.serviceId,
        clientAddress: state.currentUser.address,
        clientAlias: state.currentUser.alias,
        providerAddress: service.provider,
        providerAlias: service.providerAlias,
        status: "CREATED",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        ...state,
        orders: [...state.orders, newOrder],
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                updatedAt: new Date(),
                ...(action.payload.amounts && {
                  downPaymentAmount:
                    action.payload.amounts.downPayment ??
                    order.downPaymentAmount,
                  remainingAmount:
                    action.payload.amounts.remaining ?? order.remainingAmount,
                  totalAmount:
                    action.payload.amounts.total ?? order.totalAmount,
                }),
              }
            : order
        ),
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  toggleRole: () => void;
  createOrder: (serviceId: string) => void;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    amounts?: { downPayment?: number; remaining?: number; total?: number }
  ) => void;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleRole = () => dispatch({ type: "TOGGLE_ROLE" });

  const createOrder = (serviceId: string) =>
    dispatch({ type: "CREATE_ORDER", payload: { serviceId } });

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    amounts?: { downPayment?: number; remaining?: number; total?: number }
  ) =>
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status, amounts },
    });

  return (
    <AppContext.Provider
      value={{ state, toggleRole, createOrder, updateOrderStatus }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
