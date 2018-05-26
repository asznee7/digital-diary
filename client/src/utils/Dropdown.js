import * as React from 'react'
import styles from './Dropdown.css'
import PropTypes from 'prop-types'

export default class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listVisible: false
    }
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.setSubmenuWrapperRef = this.setSubmenuWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  switch = () => {
    this.setState({ listVisible: !this.state.listVisible })
  }

  hide = () => {
    this.setState({ listVisible: false })
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  setSubmenuWrapperRef(node){
    this.subMenuWrapperRef = node
    this.setSubmenuPosition()
  }

  setSubmenuPosition = () => {
    if (this.subMenuWrapperRef) {
      switch (this.props.position) {
        case 'right':
          this.subMenuWrapperRef.style.top =
            `${this.subMenuWrapperRef.offsetTop - this.subMenuWrapperRef.parentNode.offsetHeight}px`
          this.subMenuWrapperRef.style.left =
            `${this.subMenuWrapperRef.offsetLeft + this.subMenuWrapperRef.parentNode.offsetWidth}px`
          this.subMenuWrapperRef.style.marginLeft = '3px'
          break;
        default:
          this.subMenuWrapperRef.style.marginTop = '3px'
      }
    }
  }

  handleClickOutside(event){
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.hide()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    return (
      <div className={styles.dropdownWrapper} ref={this.setWrapperRef}>
        <div onClick={this.switch}
             className={styles.dropDownSwitcher}
             style={this.state.listVisible ? (this.props.activeStyles ? this.props.activeStyles : {}) : {}}>
          {this.props.children}
        </div>
        {
          this.state.listVisible &&
          <div className={styles.dropdownMenu} ref={this.setSubmenuWrapperRef}>
            {
              this.props.items &&
              this.props.items.map((item, i) =>
                <div key={i}
                     className={styles.dropdownMenuItem}
                     onClick={() => {this.props.onPick(item); this.hide()}}>
                  {item}
                </div>
              )
            }
          </div>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  children: PropTypes.object.isRequired,
  activeStyles: PropTypes.object,
  items: PropTypes.array,
  position: PropTypes.string
}
