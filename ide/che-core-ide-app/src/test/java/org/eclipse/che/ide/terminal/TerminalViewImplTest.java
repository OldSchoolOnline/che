/*
 * Copyright (c) 2012-2018 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
package org.eclipse.che.ide.terminal;

import static org.mockito.Mockito.verify;

import com.google.gwt.user.client.Element;
import com.google.gwtmockito.GwtMockitoTestRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

/** @author Dmitry Shnurenko */
@RunWith(GwtMockitoTestRunner.class)
public class TerminalViewImplTest {

  private static final String SOME_TEXT = "someText";

  @Mock private TerminalJso terminalJso;
  @Mock private Element element;

  @InjectMocks private TerminalViewImpl view;

  @Test
  public void errorMessageShouldBeShown() {
    view.showErrorMessage(SOME_TEXT);

    verify(view.unavailableLabel).setText(SOME_TEXT);

    verify(view.unavailableLabel).setVisible(true);
    verify(view.terminalPanel).setVisible(false);
  }
}
