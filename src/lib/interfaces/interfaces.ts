import * as express from "express";

export interface IModelController {
    create: express.RequestHandler;
    update: express.RequestHandler;
    patch: express.RequestHandler;
    delete: express.RequestHandler;
    read: express.RequestHandler;
    query: express.RequestHandler;
    executeService?: express.RequestHandler;
    executeMethod?: express.RequestHandler;
}

export interface IModelFactory {
    targetClass: any;
    collectionName: string;
    datasource: string;
    $properties: string[];
    $fields: Map<string, IField>;
    $readOnly: string[];
    $plurals: string[];
    $statics: string[];
    $methods: string[];
    $routes: IRoute[];
    $references: any;
    $prototype: any;
    $hooks: Map<string, Function>;
    actions: IModelActions;
    helper: IModelHelper;
    controller: IModelController;
    init(routers: Map<string, express.Router>, actions: IModelActions, helper: IModelHelper, controller: IModelController);
    setup(routers: Map<string, express.Router>);
    getModelFactoryByPath(path: string): IModelFactory;
    getReferenceType(refName: string): string;
    instanciateReference(type: string, data: any): any;
    getHookFunction(name: string): Function;
    populateField(parameters: IFetchParameters | IQueryParameters, item: any, key: string): void;
    simplifyReferences(item: any): any;
}

export interface IField {
    isPlural: boolean;
    isReference: boolean;
    isReverse: boolean;
    isEmbedded: boolean;
    isReadOnly: boolean;
    isUnique: boolean;
    isRequired: boolean;
    isIndexed: boolean;
    isVisible(instance: any): boolean;
}

export interface IRoute {
    method: string;
    path: string;
    fn: Function;
}

export interface IModelActions {
    query(filter?: any, parameters?: IQueryParameters): any;
    read(filter: any, parameters?: IFetchParameters): any;
    create(item: any, options?: any): any;
    update(_id: string, item: any, options?: any): any;
    delete(_id: any): any;
    //count(filter: any): number;
}

export interface IModelHelper {
    fetchInstances(filter?: any, parameters?: IQueryParameters, serializeOptions?: ISerializeOptions): any[];
    fetchInstance(filter: any, parameters?: IFetchParameters, serializeOptions?: ISerializeOptions): any;
    saveInstance(instance: any, data?: any, options?: ISaveParameters, serializeOptions?: ISerializeOptions): any;
    deleteInstance(instance: any): any;
    serialize(instance: any, parameters?: IFetchParameters | IQueryParameters, options?: ISerializeOptions): any;
    updateValues(instance: any, item: any, options?: any): void;
    getMetadata(instance: any, metadataName: string): any;
    isModified(instance: any, property: string): boolean;
}


export interface IConnector {
    datasource: string;
    config: any;
    connect(datasourceKey: string, parameters: any): any;
    createModelFactory(name: string, myClass: any): IModelFactory;
}

export interface IQueryParameters {
    includes?: string;
}

export interface IFetchParameters {
    includes?: any;
    ref?: string;
}

export interface ISaveParameters {
    ref?: string,
    deleteMissing?: boolean;
    deleteReadOnly?: boolean;
}

export interface ISerializeOptions {
    modelFactory?: IModelFactory;
    serializeRef?: boolean;
    includeInvisible?: boolean;
}

/**
 * @param name string A collection name if you don't want to use the Class name'
 */
export interface ICollection {
    datasource?: string;
    persistent?: boolean;
}

/**
 * @param path string space delimited path(s) to populate
 * @param select string optional fields to select
 */
export interface IPopulate {
    path: string;
    select: string;
}

/**
 * @param ref string The name of the related collection
 * @param type anh Should be an ObjectID...
 */
export interface IReference {
    ref: string;
    type?: any;
}

export interface IModelOptions {

}



