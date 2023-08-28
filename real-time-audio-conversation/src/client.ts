import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as octoai from 'octoai';
import { utils } from 'octoai';
import { OctoAIClientError, OctoAIServerError } from 'octoai/errors';

class Client {
    private _public_endpoints: { [key: string]: string };
    private _public_endpoints_url: string;
    private _headers: any;
    private _httpx_client: AxiosInstance;

    constructor(
        token: string | null = null,
        public_endpoints_url: string = 'https://api.octoai.cloud/v1/public-endpoints',
        config_path: string | null = null,
    ) {
        this._public_endpoints = {};
        this._public_endpoints_url = public_endpoints_url;

        if (!token) {
            token = process.env.OCTOAI_TOKEN || null;
        }

        if (!token) {
            const filePath = config_path ? path.resolve(config_path) : path.join(os.homedir(), '.octoai/config.yaml');
            try {
                const file = fs.readFileSync(filePath, 'utf8');
                const config = yaml.safeLoad(file);
                token = config?.token;
            } catch (error) {
                token = null;
            }
        }

        if (!token) {
            console.warn(
                'OCTOAI_TOKEN environment variable is not set. You won\'t be able to reach OctoAI endpoints.'
            );
        }

        const version = octoai.__version__;
        const headers = {
            'Content-Type': 'application/json',
            'user-agent': `octoai-${version}`,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        this._headers = headers;

        this._httpx_client = axios.create({
            timeout: 900000,
            headers: headers,
        });
    }

    private async _initialize_public_endpoints(): Promise<void> {
        const response = await utils.retry(() => this._httpx_client.get(this._public_endpoints_url));
        if (response.status === 200) {
            for (const model of response.data) {
                this._public_endpoints[model.name] = model.endpoint;
            }
        } else {
            this._error(response.status, response.statusText);
        }
    }

    public async infer(endpoint_url: string, inputs: { [key: string]: any }): Promise<{ [key: string]: any }> {
        const response = await utils.retry(() => this._httpx_client.post(endpoint_url, inputs));
        if (response.status !== 200) {
            this._error(response.status, response.statusText);
        }
        return response.data;
    }

    public async health_check(endpoint_url: string, timeout: number = 900.0): Promise<number> {
        const response = await utils.health_check(() => this._httpx_client.get(endpoint_url), timeout);
        if (response.status !==200) {
            this._error(response.status, response.statusText);
        }
        return response.status;
    }

    private _error(status_code: number, text: string): void {
        if (status_code >= 500) {
            throw new OctoAIServerError(`Server error: ${status_code} ${text}`);
        } else if (status_code === 429) {
            throw new OctoAIClientError(`Throttling error: ${status_code} ${text}`);
        } else {
            throw new OctoAIClientError(`Error: ${status_code} ${text}`);
        }
    }

    public async getPublicEndpoints(): Promise<{ [key: string]: string }> {
        if (!Object.keys(this._public_endpoints).length) {
            await this._initialize_public_endpoints();
        }
        return this._public_endpoints;
    }

    public async getMpt7b(): Promise<string> {
        const endpoints = await this.getPublicEndpoints();
        return `${endpoints['mpt-7b-demo']}/generate`;
    }

    public async getVicuna7b(): Promise<string> {
        const endpoints = await this.getPublicEndpoints();
        return `${endpoints['vicuna-7b-demo']}/generate`;
    }

    public async getWhisper(): Promise<string> {
        const endpoints = await this.getPublicEndpoints();
        return `${endpoints['whisper-demo']}/predict`;
    }

    public async getStableDiffusion(): Promise<string> {
        const endpoints = await this.getPublicEndpoints();
        return `${endpoints['stable-diffusion-demo']}/predict`;
    }
}
