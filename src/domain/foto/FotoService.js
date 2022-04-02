export default class FotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    list() {
        return this._resource.query()
        .then(res => res.json());
    }

    register(foto) {
        return (foto._id) ? this._resource.update({id: foto._id}, foto) : this._resource.save(foto);
    }

    remove(id) {
        return this._resource.delete({ id });
    }

    search(id) {
        return this._resource.query({ id })
        .then(res => res.json());

    }
}