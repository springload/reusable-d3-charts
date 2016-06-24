import React from 'react';
import Icon from 'react-svg-icon';

/**
 * A reusable button. Uses a <a> tag unless `type` is specified.
 */
export default React.createClass({
    displayName: 'Button',

    propTypes: {
        href: React.PropTypes.string,
        className: React.PropTypes.string,
        iconLeft: React.PropTypes.bool,
        icon: React.PropTypes.string,
        iconClassName: React.PropTypes.string,
        to: React.PropTypes.string,
        target: React.PropTypes.string,
        type: React.PropTypes.string,
        children: React.PropTypes.node,
        accessibleLabel: React.PropTypes.string,
        onClick: React.PropTypes.func,
        isLoading: React.PropTypes.bool,
        preventDefault: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            href: '#',
            className: '',
            icon: null,
            iconClassName: '',
            type: null,
            to: null,
            children: null,
            accessibleLabel: null,
            onClick: null,
            isLoading: false,
            preventDefault: true,
        };
    },

    handleClick(e) {
        const { href, type, onClick, preventDefault } = this.props;

        if (preventDefault && href === '#' && type === null) {
            e.preventDefault();
        }

        if (onClick) {
            onClick(e);
        }
    },

    render() {
        const { className, icon, iconClassName, iconLeft, children, accessibleLabel, isLoading, target } = this.props;
        const hasIcon = icon !== null;
        const hasText = children !== null;

        const iconElt = hasIcon ? (
            <Icon
                name={icon}
                className={`i-${icon} ${iconClassName}`}
                title={accessibleLabel}
            />
        ) : null;

        return (
            <a
                {...this.props}
                className={`${className} ${hasIcon && hasText ? `icon-text${iconLeft ? '' : '--rev'}` : ''} ${isLoading ? '-loading' : ''}`}
                onClick={this.handleClick}
                rel={target === '_blank' ? 'noopener' : null}
            >
                {iconLeft ? iconElt : null}
                {children ? (
                    <span className="btn__text">{children}</span>
                ) : null}
                {iconLeft ? null : iconElt}
            </a>
        );
    },
});
