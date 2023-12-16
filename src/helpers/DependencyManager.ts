/**
 * Simple TypeScript/Node.js Dependency Injection Manager
 * 
 * This module provides a lightweight and easy-to-use dependency injection (DI) manager for TypeScript and Node.js applications.
 * It allows developers to define and inject dependencies into their classes, promoting cleaner and more testable code.
 * 
 * @author Yonatan A Quintero R
 * @date 2023-12-15
 */

/**
 * A generic type that represents a function that creates an instance of a specific type.
 * @typeparam T The type of instance that the function creates.
 */
type InstanceCreatorFn<T> = () => T;

/**
 * A class that manages dependencies in an application.
 */
export default class DependencyManager {
    /**
     * A map that stores the dependencies. The key is the name of the dependency, and the value is the dependency itself.
     */
    private dependencies: Map<String, any>;

    /**
     * Creates a new DependencyManager instance.
     */
    constructor() {
        this.dependencies = new Map<String, any>();
    }

    /**
     * Registers a dependency with the dependency manager.
     * @param name The name of the dependency.
     * @param dependency The dependency to register.
     */
    register<T>(name: String, dependency: T): void {
        this.dependencies.set(name, dependency);
    }

    /**
     * Checks if a dependency with the specified name is registered with the dependency manager.
     * @param name The name of the dependency.
     * @returns `true` if the dependency is registered, `false` otherwise.
     */
    has(name: String): Boolean {
        return this.dependencies.has(name);
    }

    /**
     * Gets a dependency with the specified name.
     * @param name The name of the dependency.
     * @returns The dependency, or `undefined` if the dependency is not registered.
     */
    get<T>(name: String): T {
        return this.dependencies.get(name);
    }

    /**
     * Resolves a dependency with the specified name, creating a new instance if it does not already exist.
     * @param name The name of the dependency.
     * @param createInstance A function that creates a new instance of the dependency if it does not already exist.
     * @returns The resolved dependency.
     */
    resolve<T>(name: String, createInstance: InstanceCreatorFn<T>): T {
        if (!name) {
            throw new NameRequiredError();
        }

        if (!createInstance) {
            throw new InstanceCreatorFnRequiredError();
        }

        if (this.has(name)) {
            return this.get<T>(name);
        }

        const newInstance: T = createInstance();
        this.register(name, newInstance);

        return newInstance;
    }
}

/**
 * An error that is thrown when a name is required but not provided.
 */
class NameRequiredError extends Error {
    constructor() {
        super(`Name is required`);
    }
}

/**
 * An error that is thrown when an instance creator function is required but not provided.
 */
class InstanceCreatorFnRequiredError extends Error {
    constructor() {
        super(`Instance creator function is required`);
    }
}