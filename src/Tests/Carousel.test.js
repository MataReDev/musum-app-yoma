import React from 'react';
import ReactDOM from 'react-dom';
import ObjectComponent from './ObjectComponent';

describe('ObjectComponent', () => {
  test('renders without crashing', async () => {
    const div = document.createElement('div');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({
        title: 'Some title',
        department: 'Some department',
        primaryImage: 'http://example.com/someimage.jpg',
        objectURL: '/object/123',
        objectID: '123',
        isHighlight: true
      })
    });

    await ReactDOM.render(<ObjectComponent object='123' />, div);

    expect(div.innerHTML).toContain('Some title');
    expect(div.innerHTML).toContain('Some department');
    expect(div.innerHTML).toContain('http://example.com/someimage.jpg');
    expect(div.innerHTML).toContain('/object/123');
    expect(div.innerHTML).toContain('Voir l&#x27;objet');

    global.fetch.mockRestore();
  });

  test('renders loading indicator while fetching', async () => {
    const div = document.createElement('div');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => new Promise(() => {})
    });

    await ReactDOM.render(<ObjectComponent object='123' />, div);

    expect(div.innerHTML).toContain('loader');

    global.fetch.mockRestore();
  });

  test('renders error message when API request fails', async () => {
    const div = document.createElement('div');
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API request failed'));

    await ReactDOM.render(<ObjectComponent object='123' />, div);

    expect(div.innerHTML).toContain('error');

    global.fetch.mockRestore();
  });
});
