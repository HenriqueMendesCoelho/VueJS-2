export default class FotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    list() {
        return this._resource.query()
        .then(res => res.json(), err => {
            console.log(err);
            throw new Error("Não foi possível obter as fotos, tente novamente mais tarde");
        });
    }

    register(foto) {
        return (foto._id) ? this._resource.update({id: foto._id}, foto) : this._resource.save(foto);
    }

    remove(id) {
        return this._resource.delete({ id })
        .then(null, err => {
            console.log(err);
            throw new Error("Não foi possível deletar a imagem");
        });
    }

    search(id) {
        return this._resource.query({ id })
        .then(res => res.json());

    }
}