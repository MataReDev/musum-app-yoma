import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait initialiser les variables d\'état correctement', () => {
    const wrapper = shallow(<SearchResult departmentId={1} />);
    expect(wrapper.state('data')).toBe(null);
    expect(wrapper.state('startIndex')).toBe(0);
    expect(wrapper.state('endIndex')).toBe(20);
    expect(wrapper.state('showHighlightedOnly')).toBe(false);
  });

  it('doit appeler searchItem quand searchValue change', () => {
    const mockSearchItem = jest.fn();
    const mockProps = { departmentId: 1 };
    const wrapper = shallow(<SearchResult {...mockProps} />);
    wrapper.instance().searchItem = mockSearchItem;
    wrapper.setProps({ departmentId: 2 });
    expect(mockSearchItem).toHaveBeenCalledTimes(0);
    wrapper.setProps({ departmentId: 1 });
    expect(mockSearchItem).toHaveBeenCalledTimes(1);
  });

  it('devrait construire le endpoint de l\'API correctement', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ objectIDs: [] }),
      })
    );
    const mockProps = { departmentId: 1 };
    const mockSearchValue = 'painting';
    const wrapper = shallow(<SearchResult {...mockProps} />);
    wrapper.instance().useSearchValue = () => mockSearchValue;
    wrapper.instance().searchItem();
    expect(fetch.mock.calls[0][0]).toEqual(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${mockSearchValue}`
    );
    global.fetch.mockClear();
  });

  it('devrait mettre à jour les variables d\'état correctement dans la fonction handleSeeLess', () => {
    const wrapper = shallow(<SearchResult departmentId={1} />);
    wrapper.setState({ endIndex: 40 });
    wrapper.instance().handleSeeLess();
    expect(wrapper.state('startIndex')).toBe(0);
    expect(wrapper.state('endIndex')).toBe(20);
    wrapper.setState({ endIndex: 30 });
    wrapper.instance().handleSeeLess();
    expect(wrapper.state('startIndex')).toBe(0);
    expect(wrapper.state('endIndex')).toBe(20);
  });

  it('devrait mettre à jour les variables d\'état correctement dans la fonction handleSeeMore', () => {
    const wrapper = shallow(<SearchResult departmentId={1} />);
    wrapper.setState({ endIndex: 20, data: new Array(25).fill(0) });
    wrapper.instance().handleSeeMore();
    expect(wrapper.state('startIndex')).toBe(0);
    expect(wrapper.state('endIndex')).toBe(25);
    wrapper.setState({ endIndex: 22 });
    wrapper.instance().handleSeeMore();
    expect(wrapper.state('startIndex')).toBe(0);
    expect(wrapper.state('endIndex')).toBe(22);
  });
})