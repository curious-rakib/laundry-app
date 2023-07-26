import {
  getAllCategoriesService,
  getAllServicesService,
} from "./../../services/allservices";
import React, { createContext, useState } from "react";
import type {
  CategoryType,
  Service,
  ServiceCategory,
} from "./../../models/servicemodel";

export type ServiceContextType = {
  services: {
    // loading: boolean,
    data: Service[];
  };
  categories: {
    // loading: boolean,
    data: ServiceCategory[];
  };
  fetchServices: () => void;
  fetchCategories: (catType: CategoryType) => void;
};

export const ServiceContext = createContext<ServiceContextType | null>(null);

const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const fetchServices = () => {
    getAllServicesService()
      .then((res: any) => {
        setServices(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const fetchCategories = (catType: CategoryType) => {
    getAllCategoriesService(catType)
      .then((res: any) => {
        setCategories(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <ServiceContext.Provider
      value={{
        services: {
          data: services,
        },
        categories: {
          data: categories,
        },
        fetchServices,
        fetchCategories,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
