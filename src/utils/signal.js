const context = [];

export function signal(value) {
    const subscriptions = new Set();

    const read = () => {
        const running = context[context.length - 1];
        if (running) {
            subscriptions.add(running);
            running.dependencies.add(subscriptions);
        }
        return value;
    };

    read.set = (nextValue) => {
        value = nextValue;
        [...subscriptions].forEach(sub => sub.execute());
    };

    return read;
}

function cleanup(running) {
    running.dependencies.forEach(dep => dep.delete(running));
    running.dependencies.clear();
}

export function effect(fn) {
    const execute = () => {
        cleanup(running);
        context.push(running);
        try {
            fn();
        } finally {
            context.pop();
        }
    };

    const running = {
        execute,
        dependencies: new Set()
    };

    execute();
}