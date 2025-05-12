import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedCreate = jest.fn();
  const mockedGet = jest.fn();

  beforeEach(() => {
    mockedAxios.create = mockedCreate;
    mockedCreate.mockReturnValue({
      get: mockedGet,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    mockedGet.mockResolvedValue({ data: 'test-data' });

    await throttledGetDataFromApi('/posts');

    expect(mockedCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedGet.mockResolvedValue({ data: 'test-data' });

    await throttledGetDataFromApi('/users');

    expect(mockedGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    mockedGet.mockResolvedValue({ data: { id: 1, title: 'Post' } });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual({ id: 1, title: 'Post' });
  });
});
