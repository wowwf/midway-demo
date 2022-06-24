import {close, createApp, createHttpRequest} from "@midwayjs/mock";
import {Framework} from "@midwayjs/koa";
import * as assert from 'assert';
import * as _ from 'lodash';

describe('test/controller/user.test.ts', () => {

  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();

    await createHttpRequest(app).post('/api/user').send({ username: 'jack', password: 'redballoon' });

    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({ username: 'jack', password: 'redballoon' });
    assert.equal(result.body.code, 200);
    assert.equal(result.body.result, 'success');
    assert.equal(result.body.message, '登录成功');
    assert.ok(_.isString(result.body.data.token), 'token未正常获取');

    const errorResult = await createHttpRequest(app).post('/api/user/login').send({ username: 'jack', password: 'test' });
    assert.equal(errorResult.body.code, 400);
    assert.equal(errorResult.body.result, 'error');
    assert.equal(errorResult.body.message, '账号或密码不正确');
    assert.ok(_.isNil(errorResult.body.data), '处理异常');

    // close app
    await close(app);
  });

});
