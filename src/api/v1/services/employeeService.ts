/**
 * Employee Service (employeeService.ts)
 *
 * This file defines functions (services) for managing employee data. These functions
 * currently store employees in-memory but could be extended to use a database.
 */
import { Employee } from "../models/employeeModel"
import {
    getDocuments,
    createDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValue,
} from "../repositories/firestoreRepository";
import { ServiceError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
} from "../utils/errorUtils";

const COLLECTION = "employees";

/**
 * @description Create a new employee.
 * @param {Partial<Employee>} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
    const id: string = await createDocument(COLLECTION, employee);
    return { id, ...employee } as Employee;
};

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};

/**
 * @description Get employee by a specific ID.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Employee>} The employee matching the given ID.
 * @throws {ServiceError} If no employees with the given ID are found or if the query fails.
 */
export const getEmployeeById = async (
    id: string,
): Promise<Employee> => {
    try {
        const doc: FirebaseFirestore.DocumentSnapshot = await getDocumentById(COLLECTION, id);

        if (!doc.exists) {
            throw new Error(`Document with ID ${id} does not exist`);
        }

        const data: FirebaseFirestore.DocumentData | undefined = doc.data();
        if (!data) {
            throw new Error(`Failed to retrieve data for document with ID ${id}`);
        }

        return { id, ...data } as Employee;
    } catch (error: unknown) {
        throw new ServiceError(
            `Failed to get employee ${id}: ${getErrorMessage(error)}`,
            getErrorCode(error)
        );
    }
};

/**
 * @description Get employees by a specific field value.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Employee[]>} Array of employees matching the criteria.
 * @throws {ServiceError} If no employees with the given field value are found or if the query fails.
 */
export const getEmployeesByField = async (
    fieldName: string,
    fieldValue: any,
    limit?: number
): Promise<Employee[]> => {
    try {
        const snapshot: FirebaseFirestore.QuerySnapshot =
            await getDocumentsByFieldValue(
                COLLECTION,
                fieldName,
                fieldValue,
                limit
            );

        return snapshot.docs.map((doc) => {
            const data: FirebaseFirestore.DocumentData = doc.data();
            return { id: doc.id, ...data } as Employee;
        });
    } catch (error: unknown) {
		throw new ServiceError(
			`Failed to get employee ${fieldValue}: ${getErrorMessage(error)}`,
			getErrorCode(error)
		);
	}
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<Employee>} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {ServiceError} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    employee: Partial<Employee>
): Promise<Employee> => {
    try {
        await updateDocument(COLLECTION, id, employee);
        return { id, ...employee } as Employee;
    } catch (error: unknown) {
		throw new ServiceError(
			`Failed to update employee ${id}: ${getErrorMessage(error)}`,
			getErrorCode(error)
		);
	}
};

/**
 * @description Delete a employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {ServiceError} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
		throw new ServiceError(
			`Failed to delete employee ${id}: ${getErrorMessage(error)}`,
			getErrorCode(error)
		);
	}
};
