import { db } from "../firebase/setup";
import React, { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { collection, addDoc, getDocs, DocumentData, QuerySnapshot, getDoc, doc } from "firebase/firestore";

export interface Product {
    id?: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ProductsContextType {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => Promise<void>;
    fetchProducts: () => Promise<void>;
    getProductById: (id: string) => Promise<Product | null>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
        try {
            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "products"));
            const productsList: Product[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Product }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);

    const addProduct = useCallback(async (product: Omit<Product, "id">) => {
        try {
            const docRef = await addDoc(collection(db, "products"), product);
            setProducts(prevProducts => [...prevProducts, { id: docRef.id, ...product }]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }, []);

    const getProductById = useCallback(async (id: string): Promise<Product | null> => {
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() as Product };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching product by id:", error);
            return null;
        }
    }, []);

    return (
        <ProductsContext.Provider value={{ products, addProduct, fetchProducts, getProductById }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
};
