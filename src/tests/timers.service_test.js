import sinon from 'sinon';
import {expect} from 'chai';
import service from '../service';

describe('timers service', () => {
  const apiClient = {
    post: sinon.spy(() => Promise.resolve()),
    patch: sinon.spy(() => Promise.resolve()),
    delete: sinon.spy(() => Promise.resolve())
  };

  const timersService = service(apiClient).timers;

  describe('#add counter', () => {
    it('calls the api client post method', () => {
      timersService.addCounter();
      expect(apiClient.post.calledOnce).to.be.true;
    });
  });
  describe('#edit counter', () => {
    it('calls the api client patch method', () => {
      timersService.editCounter();
      expect(apiClient.patch.calledOnce).to.be.true;
    });
  });
  describe('#delete counter', () => {
    it('calls the api client delete method', () => {
      timersService.deleteCounter();
      expect(apiClient.delete.calledOnce).to.be.true;
    });
  });
});
