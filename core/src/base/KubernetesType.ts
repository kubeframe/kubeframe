/**
 * Base class for all Kubernetes types.
 */
export abstract class KubernetesType {

    parent?: KubernetesType;

    children: KubernetesType[] = [];

    abstract toJSON(): any;

    constructor() {
        this.children = [];
        this.parent = undefined;
    }

    addChild(child: KubernetesType) {
        this.children.push(child);
        child.setParent(this);
    }

    removeChild(child: KubernetesType) {
        this.children = this.children.filter(c => c !== child);
        child.setParent(undefined);
    }

    setParent(parent: KubernetesType) {
        this.parent = parent;
    }

    getParent(): KubernetesType | undefined {
        return this.parent;
    }

    traverse(callback: (resource: KubernetesType) => void) {
        callback(this);
        this.children.forEach(child => child.traverse(callback));
    }
}
