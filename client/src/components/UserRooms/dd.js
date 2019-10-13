return (
  <div className="ButtonToyWidget">
    {this.props.buttonList.length > 0 &&
      this.props.buttonList.map(a => <SimpleButton />)}
  </div>
);
