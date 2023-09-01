import * as React from "react";
export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class NotFound extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <p>Sorry, the page you visited does not exist.</p>
      // <Result
      //   status="404"
      //   title="404"
      //   subTitle="Sorry, the page you visited does not exist."
      //   extra={<Button type="primary">Back Home</Button>}
      // />
    );
  }
}
