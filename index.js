export default function(url, options) {
    let retries = 3;
    let delay = 3000;

    if (options && "retries" in options) {
        retries = options.retries;
    }

    if (options && "delay" in options) {
        delay = options.delay;
    }

    return new Promise((resolve, reject) => {
        const _fetch = async n => {
            try {
                let response = await fetch(url, options);
                resolve(response);
            }
            catch(error) {
                console.log(error);
                if (n > 0) {
                    retry(n);
                } else {
                    reject(error);
                }
            }
        }

        function retry(n) {
            setTimeout(() => {
                _fetch(--n);
            }, delay);
        }

        _fetch(retries);
    });
}