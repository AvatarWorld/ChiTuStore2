import fetch = require('fetch');

const SERVICE_HOST = 'service.alinq.cn:2014';//'service.alinq.cn:2014';///UserServices
let config = {
    service: {
        shop: `http://${SERVICE_HOST}/Shop/`,
        site: `http://${SERVICE_HOST}/Site/`,
        member: `http://${SERVICE_HOST}/Member/`,
        weixin: `http://${SERVICE_HOST}/WeiXin/`,
        account: `http://${SERVICE_HOST}/Account/`,
    },
    appToken: '7F0B6740588DCFA7E1C29C627B8C87379F1C98D5962FAB01D0D604307C04BFF0182BAE0B98307143'
}

let token = '';
export function ajax<T>(url: string, data?: any): Promise<T> {
    //options = options || ({} as FetchOptions);
    data = data || {};
    Object.assign(data, { AppToken: config.appToken });


    var form = new FormData();
    for (let key in data) {
        form.append(key, data[key])
    }

    let options = {
        //headers: { appToken: config.appToken, token },
        body: form,
        method: 'post'
    } as FetchOptions;

    return fetch(url, options).then((response) => {
        let text = response.text();
        let p: Promise<string>;
        if (typeof text == 'string') {
            p = new Promise<string>((reslove, reject) => {
                reslove(text);
            })
        }
        else {
            p = text as Promise<string>;
        }

        return p.then((text) => {
            return new Promise((resolve, reject) => {
                let data = JSON.parse(text);
                if (data.Type != 'ErrorObject')
                    resolve(data);


                if (data.Code == 'Success') {
                    resolve(data);
                    return;
                }

                let err = new Error(data.Message);
                err.name = data.Code;
                reject(err);
                return;
            });
        })
    });
}

const imageBasePath = 'http://service.alinq.cn:2015/Shop';
export module home {
    type Product = { Id: string, Name: string, ImagePath: string };
    export function proudcts(pageIndex?: number): Promise<Product[]> {
        pageIndex = pageIndex === undefined ? 0 : pageIndex;
        let url = config.service.site + 'Home/GetHomeProducts';
        return ajax<Product[]>(url, { pageIndex }).then((products) => {
            for (let product of products) {
                product.ImagePath = imageBasePath + product.ImagePath;
            }
            return products;
        });
    }
    export function brands(): Promise<any> {
        let url = config.service.shop + 'Product/GetBrands';
        return ajax(url);
    }
    export function getProduct(productId): Promise<any> {
        let url = config.service.shop + 'Product/GetProduct';
        return ajax(url, { productId });
    }
    export function advertItems(): Promise<any[]> {
        let url = config.service.site + 'Home/GetAdvertItems'
        return ajax(url);
    }
}