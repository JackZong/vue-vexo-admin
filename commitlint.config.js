/*
 * ===========================================================================================
 * = COPYRIGHT
 *          PAX Computer Technology (Shenzhen) Co., Ltd. PROPRIETARY INFORMATION
 *   This software is supplied under the terms of a license agreement or nondisclosure
 *   agreement with PAX Computer Technology (Shenzhen) Co., Ltd. and may not be copied or
 *   disclosed except in accordance with the terms in that agreement.
 *     Copyright (C) 2022-2023 PAX Computer Technology (Shenzhen) Co., Ltd. All rights reserved.
 * Description: // Detail description about the function of this module,
 *             // interfaces with the other modules, and dependencies.
 * Revision History:
 * Date                  Author                 Action
 * 2025/12/10            PAX                    Create
 * ===========================================================================================
 */

export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 影响git-commit -m "" 提交;git cz的规范不在这里
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert'
            ]
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']
    },
    prompt: {
        messages: {
            type: '选择你要提交的类型 :',
            scope: '选择一个提交范围[可选]:',
            customScope: '请输入自定义的提交范围 :',
            subject: '请简要描述提交 :\n',
            body: '填写更加详细的变更描述[可选]。使用 "|" 换行 :\n',
            breaking: '列举非兼容性重大的变更[可选]。使用 "|" 换行 :\n',
            footerPrefixsSelect: '选择关联issue前缀[可选]:',
            customFooterPrefixs: '输入自定义issue前缀 :',
            footer: '列举关联issue [可选] 例如: #31, #I3244 :\n',
            confirmCommit: '是否提交或修改commit ?'
        },
        types: [
            { value: 'feat', name: 'feat:   🎉  新增功能', emoji: '🎉' },
            { value: 'fix', name: 'fix:   🐛  修复缺陷', emoji: '🐛' },
            { value: 'docs', name: 'docs:   📝  文档变更', emoji: '📝' },
            {
                value: 'style',
                name: 'style:   🎨  代码格式',
                emoji: '🎨'
            },
            {
                value: 'refactor',
                name: 'refactor:   🔨  代码重构',
                emoji: '🔨'
            },
            { value: 'perf', name: 'perf:    ⚡️  性能优化', emoji: '⚡️' },
            {
                value: 'test',
                name: 'test:   ✅  测试',
                emoji: '✅'
            },
            {
                value: 'build',
                name: 'build:   📦️  打包构建',
                emoji: '📦️'
            },
            { value: 'ci', name: 'ci:   👷  CI 配置变更', emoji: '👷' },
            { value: 'revert', name: 'revert:   ⏪️  代码回退', emoji: '⏪️' },
            {
                value: 'chore',
                name: 'chore:   🚀  构建/工程依赖/工具',
                emoji: '🚀'
            },
            { value: 'wip', name: 'wip:   🚧  正在开发中', emoji: '🚧' },
            { value: 'workflow', name: 'workflow:   🎯  工作流程改进', emoji: '🎯' }
        ],
        useEmoji: true,
        scopes: [],
        customScopesAlign: 'bottom',
        emptyScopesAlias: 'empty',
        customScopesAlias: 'custom',
        allowBreakingChanges: ['feat', 'fix'],
        skipQuestions: ['scope', 'body', 'breaking', 'footerPrefix', 'footer'] // 自定义选择指定的问题不显示
    }
}

// type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")

// https://commitlint.js.org/#/reference-rules
